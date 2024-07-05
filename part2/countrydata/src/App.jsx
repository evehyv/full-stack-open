import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Country from './components/Country'

const App = () => {
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value

    if (newFilter) {
      const filteredList = allCountries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

      if (filteredList.length === 1) {
        setCountry(filteredList[0])
      } else {
        setCountry(null)
      }

      setFilteredCountries(filteredList)
    }

    setFilter(newFilter)
  }

  return (
    <>
      <div>Find countries: <input value={filter} onChange={handleFilterChange} /></div>
      {filter && filteredCountries.length > 10 && <div>Too many matches, specify another filter</div>}
      {filter && filteredCountries.length < 10 && filteredCountries.length > 1 && filteredCountries.map(country => 
          <div key={country.name.common}>
            {country.name.common} <button onClick={() => setCountry(country)}>Show</button>
          </div>
        )
      }
      {country && <Country country={country} />}
    </>
  )
}

export default App
