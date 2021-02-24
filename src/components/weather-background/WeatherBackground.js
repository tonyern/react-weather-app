import React, { useState } from "react";
import "./weather-background.css";
import SearchBar from "../search-bar/SearchBar";
import WeatherInfo from "../weather-display/WeatherInfo";

const WeatherBackground = () => {
  const [weather, setWeather] = useState({});

  const changeBackground = () => {
    let background = "App ";

    if (typeof weather.main != "undefined") {
      background = background.concat(weather.weather[0].main);
    }

    console.log(background);

    return background;
  };

  return (
    <div className={changeBackground()}>
      <SearchBar searchProps={setWeather} />
      <WeatherInfo weatherData={weather} />
    </div>
  );
};

export default WeatherBackground;
