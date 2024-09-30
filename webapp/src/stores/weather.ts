import { create } from 'zustand';

import Weather from '../models/weather';

import request from '../services/requests';

import { useLoader } from './loader';
import { useToast } from './toast';
import { useCity } from './cities';

export const useWeather = create<WeatherState>((set) => {
  const { start, end } = useLoader.getState()
  const { addToast } = useToast.getState()
  const { setSelectedCity } = useCity.getState()


  return ({
    data: undefined,
    fetchByName: async (name) => {

      start('weather')

      try {
        const data = await request.get<Weather>(`http://localhost:3000/api/weather?city=${name}`)
        set({ data });
      } catch {
        addToast('An error occurred while fetching weather data. Please try again later')
        setSelectedCity()
      } finally {
        end('weather')
      }
    },
    fetchByLatLon: async ({ lat, lon }) => {
      try {
        const data = await request.get<Weather>(`http://localhost:3000/api/weather?lat=${lat}&lon=${lon}`)
        set({ data });
        return data
      } catch {
        addToast('An error occurred while fetching weather data. Please try again later')
        setSelectedCity()
      }
    }
  })
});



interface WeatherState {
  data?: Weather
  error?: any
  fetchByName: (name: string) => void
  fetchByLatLon: ({ lat, lon }: { lat: number, lon: number }) => Promise<Weather | undefined>
}