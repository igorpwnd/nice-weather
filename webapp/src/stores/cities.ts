import { create } from 'zustand';

import City from '../models/city';
import request from '../services/requests';

import { useLoader } from './loader';

export const useCity = create<CityState>((set) => ({
    cities: undefined,
    selectedCity: undefined,
    favoriteCities: JSON.parse(localStorage.getItem('favCities') as string) || [],
    error: null,
    fetchCitiesByName: async (name) => {
        set({ cities: [] });

        const loader = useLoader.getState()
        loader.start('city')

        try {
            const cities = await request.get<City[]>(`http://localhost:3000/api/cities?query=${name}`)
            set({ cities });
        } catch (error) {
            set({ error });
        } finally {
            loader.end('city')
        }
    },
    setFavorite: (fav: City) => set(state => {
        state.favoriteCities.push(fav)
        localStorage.setItem('favCities', JSON.stringify(state.favoriteCities))
        return ({ favoriteCities: [...state.favoriteCities] })
    }),
    setSelectedCity: (c: City) => set({ selectedCity: c })
}));

interface CityState {
    cities?: City[]
    selectedCity?: City
    favoriteCities: City[]
    error?: any
    fetchCitiesByName: (name: string) => void
    setFavorite: (fav: City) => void
    setSelectedCity: (fav: City) => void
}