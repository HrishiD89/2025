import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <Weather />
    </>
  );
}

export default App;

function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleInputChange(e) {
    setLocation(e.target.value);
  }

  const handleSearch = async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    setError(null);
    
    const apiKey = "438a024cc5d511f8a594f81c6963c2d3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.cod === '404') {
        throw new Error('City not found');
      }
      
      setWeatherData(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="weather-app">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={location}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button onClick={handleSearch} disabled={loading || !location.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {weatherData && !error && (
        <div className="weather-card">
          <div className="weather-card-header">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <div className="weather-desc">
              {weatherData.weather[0].description}
            </div>
          </div>
          
          <div className="weather-card-body">
            <div className="weather-main">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt={weatherData.weather[0].description}
                className="weather-icon"
              />
              <div className="temperature">
                {Math.round(weatherData.main.temp)}°C
                <div className="feels-like">
                  Feels like: {Math.round(weatherData.main.feels_like)}°C
                </div>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weatherData.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{weatherData.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{weatherData.main.pressure} hPa</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
