import Loader from './components/Loader'
import Search from './components/Search'
import Toast from './components/Toast';
import Weather from './components/Weather';

import { useLoader } from './stores/loader';

import './App.css'

function App() {
  const { loading } = useLoader()

  return (
    <section className="absolute h-full w-full bg-[color:var(--bg-grey)] mx-auto my-0">
      <div className="max-w-[600px] mx-auto my-0 px-4 py-6">
        <Search />
        <Weather />
        {loading.size > 0 && <Loader />}
        <Toast />
      </div>
    </section>
  )
}

export default App
