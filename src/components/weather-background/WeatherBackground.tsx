import React, { useState } from "react";
import "./weather-background.css";
import SearchBar from "../search-bar/SearchBar";
import WeatherInfo from "../weather-display/WeatherInfo";

const WeatherBackground = (): JSX.Element => {
  const [weather, setWeather] = useState({});

  const changeBackground = (): string => {
    let background = "App ";

    // @ts-ignore
    if (typeof weather.main != "undefined") {
      // @ts-ignore
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
