import { ChangeEvent, useState, useRef } from 'react';

import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import Pin from '../Icons/Pin';

import City from '../../models/city';

import { debounce } from '../../services/debounce';

import { useWeather } from '../../stores/weather';
import { useCity } from '../../stores/cities';
import { useLoader } from '../../stores/loader';

import './styles.css';
import { useToast } from '../../stores/toast';

const Search = () => {
  const loader = useLoader();
  const { addToast } = useToast()
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  const { fetchCitiesByName, setSelectedCity, clearCities, toggleFavorite, cities, favoriteCities } = useCity();
  const { fetchByLatLon, fetchByName } = useWeather();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) return clearCities();

    debounce(() => {
      setShowSuggestions(value.length > 0);
      fetchCitiesByName(value)
    }, 600);
  };

  const fetchByMyLocation = () => {
    loader.start('city');
    loader.start('geolocation');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const tempWeather = await fetchByLatLon({ lat: latitude, lon: longitude });
        const cities = await fetchCitiesByName(String(tempWeather?.name));

        if (cities) setSelectedCity(cities[0]);

        loader.end('geolocation');
      },
      () => {
        addToast('Location access denied. Please enable location permissions in your browser settings and try again.')
        loader.end('geolocation');
        loader.end('city');
      },
      { enableHighAccuracy: true }
    );
  };

  const selectCityAndFetchWeather = (c: City) => {
    setInputValue('');
    setSelectedCity();
    clearCities();

    setSelectedCity(c);
    fetchByName(c.city);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container relative">
      <div className="named-search">
        <p className="text-sm text-[color:var(--grey)] text-right px-2 pb-1">Click the pin icon to try geolocation search.</p>
        <input
          className="w-full border-[color:var(--grey)] text-base text-[color:var(--grey)] px-4 py-2 rounded-[25px] border-2 border-solid"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(inputValue.length > 0)}
          placeholder="Enter city..."
        />

        <Pin title="Search by my location" role="button" className="absolute right-4 top-[33px] pin" onClick={fetchByMyLocation} />

        {showSuggestions && inputValue && cities && cities.length > 0 && (
          <div
            ref={suggestionsRef}
            className="search-items absolute border bg-[white] z-[1] w-full max-h-[500px] overflow-y-auto rounded-[25px] border-solid mt-1"
          >
            {cities.map(c => (
              <div
                key={c.id}
                className="cursor-pointer py-2 px-4 hover:bg-[color:var(--bg-grey)] font-light text-base flex justify-between">
                <div className="w-full" onClick={() => selectCityAndFetchWeather(c)}>
                  <span className="mr-2">
                    {getUnicodeFlagIcon(c.countryCode)}
                  </span>
                  <span>{c.city} - {c.region}</span>
                </div>
                <button onClick={() => toggleFavorite(c)}>⭐</button>
              </div>
            ))}

            {Boolean(favoriteCities.length) &&
              <p className="p-2 text-center bg-[#f6f6f6] text-sm border-y-[#dddddd] border-t border-solid border-b">Favorite Cities</p>
            }
            {favoriteCities.map(fc => (
              <div
                key={fc.id}
                className="cursor-pointer py-2 px-4 hover:bg-[color:var(--bg-grey)] font-light text-base flex justify-between">
                <div className="w-full" onClick={() => selectCityAndFetchWeather(fc)}>
                  <span className="mr-2">
                    {getUnicodeFlagIcon(fc.countryCode)}
                  </span>
                  <span>{fc.city} - {fc.region}</span>
                </div>
                <button onClick={() => toggleFavorite(fc)}>🚫</button>
              </div>
            ))}
          </div>
        )}
        {inputValue && cities?.length === 0 &&
          <p className="text-sm ml-2 pt-1">No cities were found 😔</p>
        }
      </div>

    </div >
  );
};

export default Search;
