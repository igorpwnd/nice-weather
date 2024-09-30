import { ChangeEvent, useCallback, useState } from 'react';

import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import Pin from '../Icons/Pin';

import City from '../../models/city';

import { useWeather } from '../../stores/weather';
import { debounce } from '../../services/debounce';
import { useCity } from '../../stores/cities';
import { useLoader } from '../../stores/loader';

import './styles.css';

const Search = () => {
  const loader = useLoader()

  const [isDoingNamedSearch, setIsDoingNamedSearch] = useState(true)
  const [inputValue, setInputValue] = useState('');

  const { fetchCitiesByName, cities, setSelectedCity } = useCity()
  const { fetchByLatLon, fetchByName } = useWeather()


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    debounce(() => fetchCitiesByName(value), 500)
    setInputValue(value);
  };

  const fetchByMyLocation = () => {
    loader.start('geolocation');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchByLatLon({ lat: latitude, lon: longitude });
        loader.end('geolocation');
      },
      (error) => {
        console.error("Error getting location:", error);
        loader.end('geolocation');
      },
      { enableHighAccuracy: true }
    );
  }

  const selectCityAndFetchWeather = (c: City) => {
    setInputValue('')

    setSelectedCity(c)
    fetchByName(c.city)
  }

  const changeSearchMode = useCallback(() => {
    setIsDoingNamedSearch(isDoingNamedSearch)
  }, [isDoingNamedSearch])

  return (
    <div className="search-container relative">
      {isDoingNamedSearch &&
        <div className="named-search">
          <input
            className="w-full border-[color:var(--grey)] text-base text-[color:var(--grey)] px-4 py-2 rounded-[25px] border-2 border-solid"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter city..."
          />

          <Pin title="Search by my location" role="button" className="absolute right-4 top-2.5 pin" onClick={fetchByMyLocation} />
          <button className="text-sm text-[color:var(--grey)] text-right w-full mt-1 pr-2" onClick={changeSearchMode}>
            You won't believe it but, i'm <span className="underline">feeling lucky with coordinates today</span>
          </button>
          {inputValue && cities && cities.length > 0 &&
            <div className="search-items absolute border bg-[white] z-[1] w-full max-h-[200px] overflow-y-auto rounded-[25px] border-solid -mt-5">
              {cities.map(c => <div key={c.id} className="cursor-pointer py-2 pl-4 hover:bg-[color:var(--bg-grey)] font-light text-base"
                onClick={() => selectCityAndFetchWeather(c)} >
                <span className='mr-2'>
                  {getUnicodeFlagIcon(c.countryCode)}
                </span>
                <span>{c.city} - {c.region}</span>
              </div>)}
            </div>}
        </div>
      }
    </div>
  );
};

export default Search;
