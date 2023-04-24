import {useState, useEffect} from 'react'
import Country from './components/Country'
import apiService from './services/api'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  console.log(countries)

  useEffect(() => {apiService.getAll().then(c => setCountries(c))}, [])

  const updateSearcher = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <div>Find countries: <input value={search} onChange={updateSearcher}/></div>
      <Country searchTerm={search} countryList={countries}/>
    </div>)

}

export default App;