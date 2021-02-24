import React, { useState } from "react";
import "./index.css";
import SearchBar from "./components/search-bar/SearchBar";
import WeatherInfo from "./components/weather-display/WeatherInfo";

const App = () => {
  const [weather, setWeather] = useState({});

  const changeBackground = () => {
    let background = "App ";

    if (typeof weather.main != "undefined") {
      background = background.concat(weather.weather[0].main);
    }

    return background;
  };

  return (
    <div className={changeBackground()}>
      <main>
        <SearchBar searchProps={setWeather} />
        <WeatherInfo weatherData={weather} />
      </main>
    </div>
  );
};

export default App;
