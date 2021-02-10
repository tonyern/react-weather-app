import React, { useState } from 'react';

const App = () => {

  const openWeatherMapAPI = {
    key: "8713314e929a6ae57041a78e979b402d",
    base: "http://api.openweathermap.org/data/2.5/"
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [degree, setDegree] = useState('C');

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${openWeatherMapAPI.base}weather?q=${query}&units=metric&APPID=${openWeatherMapAPI.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  const changeBackground = () => {
    let background = "App ";

    if (typeof weather.main != "undefined") {
      background = background.concat(weather.weather[0].main);
    } else {
      return background;
    }

    return background;
  }

  // Change temperature display to celsius or fahranheit.
  const toggleDegrees = () => {
    if (degree === 'C') {
      setDegree('F');
    } else {
      setDegree('C');
    }
  }

  // Converting celsius to fahrenheit and then rounding.
  const roundFahrenheit = (celsius) => {
    return Math.round((9 / 5) * celsius + 32);
  }

  // Rounding celsius.
  const roundCelsius = (celsius) => {
    return Math.round(celsius);
  }

  const convertWindMPH = (windSpeed) => {
    return Math.round(windSpeed * 2.236936);
  }

  /*
    Code from link below:
    https://community.openhab.org/t/convert-wind-direction-degrees-to-compass-points/71677/3.
  */
  const getWindDirection = (windDirection) => {
    let j = (windDirection + 11.25) % 360;

         if (j <=  22.5) return "N";
    else if (j <=  45  ) return "North NE";
    else if (j <=  67.5) return "NE";
    else if (j <=  90  ) return "East NE";
    else if (j <= 112.5) return "E";
    else if (j <= 135  ) return "East SE";
    else if (j <= 157.5) return "SE";
    else if (j <= 180  ) return "South SE";
    else if (j <= 202.5) return "S";
    else if (j <= 225  ) return "South SW";
    else if (j <= 247.5) return "SW";
    else if (j <= 270  ) return "West SW";
    else if (j <= 292.5) return "W";
    else if (j <= 315  ) return "West NW";
    else if (j <= 337.5) return "NW";
    else                 return "North NW";
  }

  return (
    <div className={changeBackground()}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search City" 
            onChange={event => setQuery(event.target.value)}
            value={query}
            onKeyPress={search} />
        </div>

        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div>
              {(degree === 'C') ? 
                (<div className="temperature">{roundCelsius(weather.main.temp)}</div>) : 
                (<div className="temperature">{roundFahrenheit(weather.main.temp)}</div>)}
              <button className="temperature degree-btn" onClick={toggleDegrees}>°{degree}</button>
            </div>
            <div>
            {(degree === 'C') ? 
                (<div className="detail-temperature">
                  Feels Like: {roundCelsius(weather.main.feels_like)}°{degree} | Low: {roundCelsius(weather.main.temp_min)}°{degree} | High: {roundCelsius(weather.main.temp_max)}°{degree}
                </div>) : 
                (<div className="detail-temperature">
                  Feels Like: {roundFahrenheit(weather.main.feels_like)}°{degree} | Low: {roundFahrenheit(weather.main.temp_min)}°{degree} | High: {roundFahrenheit(weather.main.temp_max)}°{degree}
                </div>)}
            </div>

            <div className="weather">{weather.weather[0].main}</div>
            <div className="weather">Humidity: {weather.main.humidity}%</div>
            <div className="weather">
              Wind: {convertWindMPH(weather.wind.speed)} MPH {getWindDirection(weather.wind.deg)}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
