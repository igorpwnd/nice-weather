import Loader from './components/Loader'
import Search from './components/Search'
import Weather from './components/Weather';

import { useLoader } from './stores/loader';

import './App.css'

function App() {
  const { loading } = useLoader()

  return (
    <section className="app">
      <div className="content">
        <Search />
        <Weather />
        {loading.size > 0 && <Loader />}
      </div>
    </section>
  )
}

export default App
