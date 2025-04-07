import React from 'react';
import './WeatherComparison.css';

const WeatherComparison = ({ location1, location2, weather1, weather2 }) => {
    const getComparisonClass = (value1, value2) => {
        if (value1 > value2) return 'higher';
        if (value1 < value2) return 'lower';
        return 'equal';
    };

    return (
        <div className="weather-comparison">
            <h3>Weather Comparison</h3>
            <div className="comparison-container">
                <div className="location-header">
                    <div className="location-name">{location1}</div>
                    <div className="location-name">{location2}</div>
                </div>
                
                <div className="comparison-row">
                    <div className="metric-label">Temperature</div>
                    <div className={`metric-value ${getComparisonClass(weather1.main.temp, weather2.main.temp)}`}>
                        {Math.round(weather1.main.temp)}°C
                    </div>
                    <div className={`metric-value ${getComparisonClass(weather2.main.temp, weather1.main.temp)}`}>
                        {Math.round(weather2.main.temp)}°C
                    </div>
                </div>

                <div className="comparison-row">
                    <div className="metric-label">Feels Like</div>
                    <div className={`metric-value ${getComparisonClass(weather1.main.feels_like, weather2.main.feels_like)}`}>
                        {Math.round(weather1.main.feels_like)}°C
                    </div>
                    <div className={`metric-value ${getComparisonClass(weather2.main.feels_like, weather1.main.feels_like)}`}>
                        {Math.round(weather2.main.feels_like)}°C
                    </div>
                </div>

                <div className="comparison-row">
                    <div className="metric-label">Humidity</div>
                    <div className={`metric-value ${getComparisonClass(weather1.main.humidity, weather2.main.humidity)}`}>
                        {weather1.main.humidity}%
                    </div>
                    <div className={`metric-value ${getComparisonClass(weather2.main.humidity, weather1.main.humidity)}`}>
                        {weather2.main.humidity}%
                    </div>
                </div>

                <div className="comparison-row">
                    <div className="metric-label">Wind Speed</div>
                    <div className={`metric-value ${getComparisonClass(weather1.wind.speed, weather2.wind.speed)}`}>
                        {Math.round(weather1.wind.speed * 3.6)} km/h
                    </div>
                    <div className={`metric-value ${getComparisonClass(weather2.wind.speed, weather1.wind.speed)}`}>
                        {Math.round(weather2.wind.speed * 3.6)} km/h
                    </div>
                </div>

                <div className="comparison-row">
                    <div className="metric-label">Pressure</div>
                    <div className={`metric-value ${getComparisonClass(weather1.main.pressure, weather2.main.pressure)}`}>
                        {weather1.main.pressure} hPa
                    </div>
                    <div className={`metric-value ${getComparisonClass(weather2.main.pressure, weather1.main.pressure)}`}>
                        {weather2.main.pressure} hPa
                    </div>
                </div>

                <div className="comparison-row">
                    <div className="metric-label">Conditions</div>
                    <div className="metric-value">
                        {weather1.weather[0].description}
                    </div>
                    <div className="metric-value">
                        {weather2.weather[0].description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherComparison; 