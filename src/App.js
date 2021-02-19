import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./index.css";
import "./search-bar.css";
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
      axios
        .get(
          `${openWeatherMapAPI.base}weather?q=${query}&units=metric&APPID=${openWeatherMapAPI.key}`
        )
        .then((response) => {
          setQuery("");
          setWeather(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          setQuery("");

          if (error.response) {
            // Error if city name was not found or invalid input.
            console.log(error.response.data);
          } else if (error.request) {
            // Error if no response was received.
            console.log(error.request);
          } else {
            // Other errors.
            console.log(error.message);
          }
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
