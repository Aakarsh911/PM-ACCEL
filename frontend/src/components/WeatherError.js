import React from 'react';
import './WeatherError.css';

const WeatherError = ({ message }) => {
    return (
        <div className="weather-error">
            <div className="error-content">
                <span className="error-icon">⚠️</span>
                <p className="error-message">{message}</p>
                <p className="error-help">Please try again or check your input.</p>
            </div>
        </div>
    );
};

export default WeatherError; 