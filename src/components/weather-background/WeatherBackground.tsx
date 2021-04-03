import React, { useState } from "react";
import "./weather-background.css";
import SearchBar from "../search-bar/SearchBar";
import WeatherInfo from "../weather-display/WeatherInfo";

const WeatherBackground = (): JSX.Element => {
  const [weather, setWeather] = useState({});
  // Inital default background class App.
  const [background, setBackground] = useState("App");

  return (
    <div className={background} data-testid="weather-background-test">
      <main>
        <SearchBar searchProps={setWeather} getBackground={setBackground} />
        <WeatherInfo weatherData={weather} />
      </main>
    </div>
  );
};

export default WeatherBackground;
