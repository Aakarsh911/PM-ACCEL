import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ data }) => {
    const getWeatherIcon = (iconCode) => {
        return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div className="current-weather">
            <div className="weather-header">
                <h2>{data.name}, {data.sys.country}</h2>
                <img 
                    src={getWeatherIcon(data.weather[0].icon)}
                    alt={data.weather[0].description}
                    className="weather-icon"
                />
            </div>
            
            <div className="weather-info">
                <div className="temperature">
                    <span className="temp-value">{Math.round(data.main.temp)}°C</span>
                    <span className="feels-like">
                        Feels like: {Math.round(data.main.feels_like)}°C
                    </span>
                </div>
                
                <div className="weather-details">
                    <div className="detail">
                        <span className="label">Condition:</span>
                        <span className="value">{data.weather[0].description}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Humidity:</span>
                        <span className="value">{data.main.humidity}%</span>
                    </div>
                    <div className="detail">
                        <span className="label">Wind:</span>
                        <span className="value">{Math.round(data.wind.speed * 3.6)} km/h</span>
                    </div>
                    <div className="detail">
                        <span className="label">Pressure:</span>
                        <span className="value">{data.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather; 