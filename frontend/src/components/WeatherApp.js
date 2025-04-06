import React, { useState } from 'react';
import WeatherSearch from './WeatherSearch';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import WeatherError from './WeatherError';
import './WeatherApp.css';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchLocationCoordinates = async (location) => {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
        );
        const data = await response.json();
        if (!data.results || data.results.length === 0) {
            throw new Error('Location not found');
        }
        return data.results[0];
    };
    
    const fetchWeatherData = async (location) => {
        setLoading(true);
        setError(null);
        try {
            // First get coordinates for the location
            const locationData = await fetchLocationCoordinates(location);
            const { latitude, longitude, name, country } = locationData;

            // Fetch current weather and forecast with daily data
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
            );
            
            if (!weatherResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }
            
            const weatherData = await weatherResponse.json();
            console.log('Weather Data:', weatherData); // Debug log
            
            // Format the data for our components
            const currentWeather = {
                name,
                sys: { country },
                main: {
                    temp: weatherData.current.temperature_2m,
                    feels_like: weatherData.current.apparent_temperature,
                    humidity: weatherData.current.relative_humidity_2m,
                    pressure: weatherData.current.surface_pressure
                },
                weather: [{
                    description: getWeatherDescription(weatherData.current.weather_code),
                    icon: getWeatherIcon(weatherData.current.weather_code)
                }],
                wind: {
                    speed: weatherData.current.wind_speed_10m
                }
            };

            // Create forecast data for 5 days
            const forecast = {
                list: weatherData.daily.time.map((time, index) => ({
                    dt: new Date(time).getTime() / 1000,
                    main: {
                        temp_max: weatherData.daily.temperature_2m_max[index],
                        temp_min: weatherData.daily.temperature_2m_min[index]
                    },
                    weather: [{
                        description: getWeatherDescription(weatherData.daily.weather_code[index]),
                        icon: weatherData.daily.weather_code[index]
                    }]
                }))
            };
            
            setWeatherData(currentWeather);
            setForecastData(forecast);
        } catch (err) {
            console.error('Error:', err); // Debug log
            setError(err.message);
            setWeatherData(null);
            setForecastData(null);
        }
        setLoading(false);
    };

    const handleLocationSubmit = (location) => {
        fetchWeatherData(location);
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
                    );
                    if (!response.ok) {
                        throw new Error('Failed to fetch weather data');
                    }
                    const weatherData = await response.json();
                    
                    // Get location name from reverse geocoding
                    const locationResponse = await fetch(
                        `https://api.open-meteo.com/v1/reverse-geocoding?latitude=${latitude}&longitude=${longitude}`
                    );
                    const locationData = await locationResponse.json();
                    
                    const currentWeather = {
                        name: locationData.location?.name || 'Unknown Location',
                        sys: { country: locationData.location?.country || '' },
                        main: {
                            temp: weatherData.current.temperature_2m,
                            feels_like: weatherData.current.apparent_temperature,
                            humidity: weatherData.current.relative_humidity_2m,
                            pressure: weatherData.current.surface_pressure
                        },
                        weather: [{
                            description: getWeatherDescription(weatherData.current.weather_code),
                            icon: getWeatherIcon(weatherData.current.weather_code)
                        }],
                        wind: {
                            speed: weatherData.current.wind_speed_10m
                        }
                    };

                    // Create forecast data for 5 days
                    const forecast = {
                        list: weatherData.daily.time.map((time, index) => ({
                            dt: new Date(time).getTime() / 1000,
                            main: {
                                temp_max: weatherData.daily.temperature_2m_max[index],
                                temp_min: weatherData.daily.temperature_2m_min[index]
                            },
                            weather: [{
                                description: getWeatherDescription(weatherData.daily.weather_code[index]),
                                icon: weatherData.daily.weather_code[index]
                            }]
                        }))
                    };
                    
                    setWeatherData(currentWeather);
                    setForecastData(forecast);
                } catch (err) {
                    console.error('Error:', err); // Debug log
                    setError('Error fetching weather data');
                }
            }, () => {
                setError('Unable to get location');
            });
        } else {
            setError('Geolocation is not supported by your browser');
        }
    };

    // Helper function to convert WMO weather codes to descriptions
    const getWeatherDescription = (code) => {
        const descriptions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Slight snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };
        return descriptions[code] || 'Unknown';
    };

    // Helper function to convert WMO weather codes to icon codes
    const getWeatherIcon = (code) => {
        // Map WMO codes to icon names (you can customize this mapping)
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
        return iconMap[code] || '01d';
    };

    return (
        <div className="weather-app">
            <h1>Weather Forecast</h1>
            <WeatherSearch onLocationSubmit={handleLocationSubmit} onGetCurrentLocation={getCurrentLocation} />
            
            {loading && <div className="loading">Loading...</div>}
            {error && <WeatherError message={error} />}
            
            {weatherData && (
                <div className="weather-content">
                    <CurrentWeather data={weatherData} />
                    {forecastData && <ForecastWeather data={forecastData} />}
                </div>
            )}
        </div>
    );
};

export default WeatherApp; 