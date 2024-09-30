import { create } from 'zustand';

import City from '../models/city';
import request from '../services/requests';

import { useLoader } from './loader';
import { useToast } from './toast';

export const useCity = create<CityState>((set) => {
  const { start, end } = useLoader.getState()
  const { addToast } = useToast.getState()

  return ({
    cities: undefined,
    selectedCity: undefined,
    favoriteCities: JSON.parse(localStorage.getItem('favCities') as string) || [],
    fetchCitiesByName: async (name) => {
      start('city');

      try {
        const cities = await request.get<City[]>(`http://localhost:3000/api/cities?query=${name}`)
        set({ cities });
        return cities;
      } catch {
        addToast('City data request failed. Please try again later')
      } finally {
        end('city')
      }
    },
    toggleFavorite: (fav: City) => set(state => {
      const found = state.favoriteCities.findIndex(c => c.id === fav.id)

      if (!(found + 1)) {
        state.favoriteCities.push(fav);
      } else {
        state.favoriteCities.splice(found, 1);
      }

      localStorage.setItem('favCities', JSON.stringify(state.favoriteCities))
      return ({ favoriteCities: [...state.favoriteCities] })
    }),
    setSelectedCity: (c?: City) => set({ selectedCity: c }),
    clearCities: () => set({ cities: undefined })
  })
});

interface CityState {
  cities?: City[]
  selectedCity?: City
  favoriteCities: City[]
  clearCities: () => void
  fetchCitiesByName: (name: string) => Promise<City[] | undefined>
  toggleFavorite: (fav: City) => void
  setSelectedCity: (fav?: City) => void
}