import { create } from 'zustand';


export const useLoader = create<LoaderState>((set) => ({
  loading: new Set(),
  start: (name) => set(state => {
    state.loading.add(name)
    return { loading: state.loading }
  }),
  end: (name) => set(state => {
    state.loading.delete(name)
    return { loading: state.loading }
  })

}));

interface LoaderState {
  loading: Set<string>,
  start: (name: string) => void
  end: (name: string) => void
}