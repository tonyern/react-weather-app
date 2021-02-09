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
      "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  const changeBackground = () => {
    let background = "App "

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
                (<div className="temperature">{Math.round(weather.main.temp)}</div>) : 
                (<div className="temperature">{Math.round((9 / 5) * weather.main.temp + 32)}</div>)}
              <button className="temperature degree-btn" onClick={toggleDegrees}>°{degree}</button>
            </div>
            <div>
            {(degree === 'C') ? 
                (<div className="detail-temperature">
                  Feels Like: {Math.round(weather.main.feels_like)}°{degree} | Low: {Math.round(weather.main.temp_min)}°{degree} | High: {Math.round(weather.main.temp_max)}°{degree}
                </div>) : 
                (<div className="detail-temperature">
                  Feels Like: {Math.round((9 / 5) * weather.main.feels_like + 32)}°{degree} | Low: {Math.round((9 / 5) * weather.main.temp_min + 32)}°{degree} | High: {Math.round((9 / 5) * weather.main.temp_max + 32)}°{degree}
                </div>)}
            </div>

            <div className="weather">{weather.weather[0].main}</div>
            <div className="weather">Humidity: {weather.main.humidity}%</div>
            <div className="weather">Wind: {Math.round(weather.wind.speed * 2.236936)} MPH</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
