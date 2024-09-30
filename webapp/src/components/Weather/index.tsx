import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import { useCity } from "../../stores/cities"
import { useWeather } from "../../stores/weather"
import { WEATHER_LITERAL } from '../utils/literal';



const Weather = () => {
  const { selectedCity } = useCity()
  const { data } = useWeather()

  return <>
    {selectedCity && data &&
      <section className="mt-8">
        <h1 className="text-[4rem] font-black">{selectedCity.city} </h1>

        <div className="w-full bg-[#65b3ef] flex items-center justify-end rounded-[10px]">
          <img className="" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
        </div>

        <div className="flex pb-4 mb-4 border-b-[var(--grey)] border-b border-solid gap-8">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[4rem] font-extralight">{Math.round(data.main.temp)}°C</h2>
            <div className="flex gap-4">
              <h5 className="text-[#008080]">🧊 {data.main.temp_min}°C</h5>
              <h5 className="text-[#dc143c]">🔥 {data.main.temp_max}°C</h5>
            </div>
          </div>

          {data.weather[0] &&
            <div className="flex text-left flex-col justify-end pl-8 border-l-[var(--grey)] border-l border-solid">
              <p className="capitalize">{WEATHER_LITERAL[data.weather[0].icon]} {data.weather[0].description}</p>
              <p>{data.weather[0].icon.includes('d') ? '☀️ Day' : '🌙 Night'}</p>
              <p>💦 {data.main.humidity}%</p>
              <p>💨 {data.wind.speed} kph</p>
            </div>
          }

          <div className="flex text-left flex-col justify-end pl-8 border-l-[var(--grey)] border-l border-solid">
            <p>{selectedCity.city}</p>
            <p>{selectedCity.region}</p>
            <p>{selectedCity.country}
              <span className="ml-2">
                {getUnicodeFlagIcon(selectedCity.countryCode)}
              </span>
            </p>

            <a href={`https://maps.google.com/?q=${selectedCity.latitude},${selectedCity.longitude}`}>
              <span className="underline"> See on maps now!</span>
            </a>
          </div>

        </div>

        <p className="text-center mt-4">
          {selectedCity.latitude}, {selectedCity.longitude}📍
        </p>



      </section>}
  </>
}

export default Weather

