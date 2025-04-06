import React, { useState } from 'react';
import './WeatherSearch.css';

const WeatherSearch = ({ onLocationSubmit, onGetCurrentLocation }) => {
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim()) {
            onLocationSubmit(location.trim());
        }
    };

    return (
        <div className="weather-search">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city, zip code, or landmark..."
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
                <button
                    type="button"
                    onClick={onGetCurrentLocation}
                    className="location-button"
                >
                    Use Current Location
                </button>
            </form>
        </div>
    );
};

export default WeatherSearch; 