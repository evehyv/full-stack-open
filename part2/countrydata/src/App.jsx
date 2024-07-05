import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import Country from './components/Country'
import Weather from './components/Weather'

const App = () => {
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

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
        setCountryAndWeather(filteredList[0])
      } else {
        setCountry(null)
        setWeather(null)
      }

      setFilteredCountries(filteredList)
    }

    setFilter(newFilter)
  }

  const setCountryAndWeather = (selectedCountry) => {
    weatherService
      .getByCity(selectedCountry.capital)
      .then(response => {
        setCountry(selectedCountry)
        setWeather(response.data)
      })
  }

  return (
    <>
      <div>Find countries: <input value={filter} onChange={handleFilterChange} /></div>
      {filter && filteredCountries.length > 10 && <div>Too many matches, specify another filter</div>}
      {filter && filteredCountries.length < 10 && filteredCountries.length > 1 && filteredCountries.map(country => 
          <div key={country.name.common}>
            {country.name.common} <button onClick={() => setCountryAndWeather(country)}>Show</button>
          </div>
        )
      }
      {country && 
        <>
          <Country country={country} />
          <Weather weather={weather} />
        </>
      }
    </>
  )
}

export default App
