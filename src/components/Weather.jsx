import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = (props) => {
    const [weatherData, setWeatherData] = useState(null);
    const [info,setinfo]=useState("")

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.value}&units=Metric&appid=70ddbdc6a6533e62f0b7c7dc4e59298b`);
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setWeatherData(null);
            }
        };

        if (props.value) {
            fetchWeatherData();
        }
    }, [props.value]);

useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${info}&units=Metric&appid=70ddbdc6a6533e62f0b7c7dc4e59298b`)
    .then((response)=>{
        setWeatherData(response.data)
    })
},[info])
function handleChange(e){
    setinfo(e.target.value)
}
    return (
        <div className='border rounded p-5'>
            <h2 className='mb-3'>Weather App</h2>
            <input type="text" placeholder="Enter city name"   className='form-control'  onChange={handleChange}/>
            {weatherData && (
                <div className='d-flex justify-content-center align-items-center flex-column mt-3'>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {parseInt(weatherData.main.temp)} °C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
                </div>
            )}
        </div>
    );
};

export default Weather;
