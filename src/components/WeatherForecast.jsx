import React from "react";

import dateBuilder from "../functions/DateBuilder";

import "./WeatherForecast.css";

const WeatherForecast = ({ data, num, units }) => {
  if (data) {
    const { day, date, month, year } = dateBuilder(
      new Date(data.list[num].dt_txt)
    );
    return (
      <div className="card">
        <div className="day-description">
          <span>{day}</span>
        </div>
        <img
          className="card-image"
          src={`http://openweathermap.org/img/wn/${data.list[num].weather[0].icon}@2x.png`}
          alt="weather-despription"
        />
        <div className="title-degrees">
          <p>
            {data.list[num].main.temp}
            {units === "Metric" ? "°C" : "°"}
          </p>
          <hr className="seperator" />
          <div className="header-description">Date</div>
          <div className="description">
            {date}, {month}, {year}
          </div>
          <div className="header-description">General</div>
          <div className="description">
            {data.list[num].weather[0].description}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default WeatherForecast;
