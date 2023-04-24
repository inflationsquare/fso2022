import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const weatherUrl = (lat, lon) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
}

const getWeather = (lat, lon) => {
    const request = axios.get(weatherUrl(lat, lon))
    return request.then(response => {return response.data})
}

const getIconUrl = (iconId) => {
 return `https://openweathermap.org/img/wn/${iconId}@2x.png`
}

export default {getWeather, getIconUrl}