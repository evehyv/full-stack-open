const Country = ({ country }) => (
    <>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Population {country.population}</div>
        <h3>Languages:</h3>
        <ul>
          {Object.keys(country.languages).map((key) => <li key={key}>{country.languages[key]}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} height='150px' />
    </>
)

export default Country