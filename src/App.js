import React, { useState } from "react";

import WeatherForecast from "./components/WeatherForecast";

import "./App.css";

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

const unit = "metric";

function App() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(`${api.base}forecast?q=${query}&units=${unit}&APPID=${api.key}`)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setQuery("");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit} className="form-bar">
          <input
            type="text"
            placeholder="Look up a city"
            onChange={handleChange}
            value={query}
            className="form-input"
          />
          <button type="submit" className="form-button">
            Search
          </button>
        </form>

        {weatherData && (
          <div>
            <h1>
              {weatherData.city.name}, {weatherData.city.country}
            </h1>
            <div className="forecast">
              <WeatherForecast data={weatherData} num="0" units={unit} />
              <WeatherForecast data={weatherData} num="8" units={unit} />
              <WeatherForecast data={weatherData} num="16" units={unit} />
              <WeatherForecast data={weatherData} num="24" units={unit} />
              <WeatherForecast data={weatherData} num="30" units={unit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
