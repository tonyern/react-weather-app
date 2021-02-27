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

    return background;
  };

  return (
    <div className={changeBackground()} data-testid="weather-background-test">
      <main>
        <SearchBar searchProps={setWeather} />
        <WeatherInfo weatherData={weather} />
      </main>
    </div>
  );
};

export default WeatherBackground;