import React from 'react';
import './ForecastWeather.css';

const ForecastWeather = ({ data }) => {
    const getWeatherIcon = (code) => {
        // Map WMO codes to icon names
        const iconMap = {
            0: '01d', // Clear sky
            1: '02d', // Mainly clear
            2: '03d', // Partly cloudy
            3: '04d', // Overcast
            45: '50d', // Foggy
            48: '50d', // Rime fog
            51: '09d', // Light drizzle
            53: '09d', // Moderate drizzle
            55: '09d', // Dense drizzle
            61: '10d', // Slight rain
            63: '10d', // Moderate rain
            65: '10d', // Heavy rain
            71: '13d', // Slight snow
            73: '13d', // Moderate snow
            75: '13d', // Heavy snow
            77: '13d', // Snow grains
            80: '09d', // Slight rain showers
            81: '09d', // Moderate rain showers
            82: '09d', // Violent rain showers
            85: '13d', // Slight snow showers
            86: '13d', // Heavy snow showers
            95: '11d', // Thunderstorm
            96: '11d', // Thunderstorm with slight hail
            99: '11d'  // Thunderstorm with heavy hail
        };
        const iconCode = iconMap[code] || '01d';
        return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    // Take first 5 days of forecast
    const forecasts = data.list.slice(0, 5);

    return (
        <div className="forecast-weather">
            <h3>5-Day Forecast</h3>
            <div className="forecast-container">
                {forecasts.map((forecast, index) => {
                    const date = new Date(forecast.dt * 1000);
                    return (
                        <div key={index} className="forecast-day">
                            <div className="forecast-date">
                                {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                            <img
                                src={getWeatherIcon(forecast.weather[0].icon)}
                                alt={forecast.weather[0].description}
                                className="forecast-icon"
                            />
                            <div className="forecast-temp">
                                <span className="high">{Math.round(forecast.main.temp_max)}°C</span>
                                <span className="low">{Math.round(forecast.main.temp_min)}°C</span>
                            </div>
                            <div className="forecast-desc">
                                {forecast.weather[0].description}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ForecastWeather; 