import {useState} from 'react'
import weatherService from '../services/weather'

const Weather = ({capital, lat, lon}) => {
    const [icon, setIconUrl] = useState('')
    const [temp, setTemp] = useState(null)
    const [wind, setWind] = useState(null)

    weatherService
        .getWeather(lat, lon)
        .then(response => {
            setIconUrl(weatherService.getIconUrl(response.weather[0].icon))
            setTemp(response.main.temp)
            setWind(response.wind.speed)
        })
    
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {Math.round(temp-272.15)}C</p>
            <img src={icon} width='50px'/>
            <p>Wind: {wind}m/s</p>
        </div>
    )
}

export default Weather