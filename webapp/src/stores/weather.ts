import { create } from 'zustand';

import Weather from '../models/weather';

import request from '../services/requests';
import { useLoader } from './loader';

export const useWeather = create<WeatherState>((set) => ({
  data: undefined,
  loading: false,
  error: null,
  fetchByName: async (name) => {
    set({ error: null });

    const loader = useLoader.getState()
    loader.start('weather')

    try {
      const data = await request.get<Weather>(`http://localhost:3000/api/weather?city=${name}`)
      set({ data });
    } catch (error) {
      set({ error });
    } finally {
      loader.end('weather')
    }
  },
  fetchByLatLon: async ({ lat, lon }) => {
    set({ error: null });
    try {
      const data = await request.get<Weather>(`http://localhost:3000/api/weather?lat=${lat}&lon=${lon}`)
      set({ data });
    } catch (error) {
      set({ error });
    }
  }
}));



interface WeatherState {
  data?: Weather
  error?: any
  fetchByName: (name: string) => void
  fetchByLatLon: ({ lat, lon }: { lat: number, lon: number }) => void
}