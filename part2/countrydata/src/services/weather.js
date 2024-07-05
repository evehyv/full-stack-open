import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY

const getByCity = (city) => {
    return axios.get(`${baseUrl}?q=${city}&units=metric&appid=${apiKey}`)
}

export default { getByCity }