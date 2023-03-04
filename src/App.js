import React, { useState } from 'react';
import './App.css';

function App() {
  const apiKey = '387d1a3638c969b07660f9047c13e8d9';
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getWeather = () => {
    if (!city) {
      setErrorMessage('Please enter a city');
      return;
    }
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === '404') {
          setErrorMessage(`City '${city}' can not be  found`);
          setWeatherData({});
        } else {
          setWeatherData(data);
          setErrorMessage('');
        }
        setCity('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-blue-800 h-screen flex flex-col justify-center items-center">
    <div className="bg-white w-96 p-4 rounded-md">
      <input
        className="text-xl border-b p-1 border-gray-200 font-semibold uppercase w-full"
        placeholder="Enter City"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />
    </div>

    <button
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
      onClick={getWeather}
    >
      Get Weather
    </button>

    {errorMessage && (
      <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-4" role="alert">
        {errorMessage}
      </div>
    )}

    {weatherData.main ? (
      <div  className="mt-4 bg-white rounded-lg p-4 shadow-md">
        <p className="text-xl font-bold">{weatherData.name}</p>
        <p className="text-2xl font-bold">{Math.round(weatherData.main.temp)}°C</p>
      </div>
    ) : (
      <div className="mt-4 bg-white p-4 rounded-md shadow-md">
        <h4 className="text-xl font-bold text-gray-800">
        Welcome to weather app! Enter a city to get the weather
        </h4>
</div>
    )}
  </div>
  );
}

export default App;
