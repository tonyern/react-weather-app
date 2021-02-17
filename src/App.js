import React, { useEffect, useRef, useState } from "react";
import WeatherInfo from "./components/weather-display/WeatherInfo";

const App = () => {
  const openWeatherMapAPI = {
    key: "8713314e929a6ae57041a78e979b402d",
    base: "http://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `${openWeatherMapAPI.base}weather?q=${query}&units=metric&APPID=${openWeatherMapAPI.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

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
        <div className="search-box">
          <input
            type="text"
            ref={inputRef}
            className="search-bar"
            placeholder="Search City"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <WeatherInfo weatherData={weather} />
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default App;
