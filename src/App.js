import React, { useState } from "react";

import WeatherForecast from "./components/WeatherForecast";
import LoadingSpinner from "./components/LoadingSpinner";
import SwitchUnit from "./components/Switch";
import Header from "./components/Header";

import Swal from "sweetalert2";

import "./App.css";

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState("Look up a city/country");
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState("Metric");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleUnit = () => {
    if (unit === "Metric") {
      setUnit("Imperial");
    }

    if (unit === "Imperial") {
      setUnit("Metric");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query === "") {
      Swal.fire("Please enter something");
      return;
    }

    setIsLoading(true);

    fetch(`${api.base}forecast?q=${query}&units=${unit}&APPID=${api.key}`)
      .then((response) => {
        if (!response.ok) {
          setQuery("");
          setIsLoading(false);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
        setQuery("");
      })
      .catch((err) => setError(err.message + " :("), setWeatherData());
  };

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit} className="form-bar">
        <input
          type="text"
          onChange={handleChange}
          value={query}
          className="form-input"
        />
        <button type="submit" className="form-button">
          Search
        </button>
      </form>
      <SwitchUnit clickThis={handleUnit} unit={unit} />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {weatherData ? (
            <div>
              <h1 className="city-name">
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
          ) : (
            <p className="filler-text">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
