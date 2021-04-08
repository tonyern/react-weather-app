import React, { useState } from "react";
import "./weather-info.css";

// @ts-ignore
const WeatherInfo = ({ weatherData }): JSX.Element => {
  const [degree, setDegree] = useState("C");

  const dateBuilder = (d: Date): string => {
    let months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days: string[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Change temperature display to celsius or fahranheit.
  const toggleDegrees = (): void => {
    if (degree === "C") setDegree("F");
    if (degree === "F") setDegree("C");
  };

  // Converting celsius to fahrenheit and then rounding.
  const roundFahrenheit = (celsius: number): number => {
    return Math.round((9 / 5) * celsius + 32);
  };

  // Rounding celsius.
  const roundCelsius = (celsius: number): number => {
    return Math.round(celsius);
  };

  // Take wind from API and convert it to MPH.
  const convertWindMPH = (windSpeed: number): number => {
    return Math.round(windSpeed * 2.236936);
  };

  /*
    Code from link below:
    https://community.openhab.org/t/convert-wind-direction-degrees-to-compass-points/71677/3.
  */
  const getWindDirection = (windDirection: number): string => {
    let j = (windDirection + 11.25) % 360;

    if (j <= 22.5) return "N";
    else if (j <= 45) return "North NE";
    else if (j <= 67.5) return "NE";
    else if (j <= 90) return "East NE";
    else if (j <= 112.5) return "E";
    else if (j <= 135) return "East SE";
    else if (j <= 157.5) return "SE";
    else if (j <= 180) return "South SE";
    else if (j <= 202.5) return "S";
    else if (j <= 225) return "South SW";
    else if (j <= 247.5) return "SW";
    else if (j <= 270) return "West SW";
    else if (j <= 292.5) return "W";
    else if (j <= 315) return "West NW";
    else if (j <= 337.5) return "NW";
    else return "North NW";
  };

  return (
    <div data-testid="weather-info-test">
      {typeof weatherData.main != "undefined" ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weatherData.name}, {weatherData.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div>
              {degree === "C" ? (
                <div className="temperature">
                  {roundCelsius(weatherData.main.temp)}
                </div>
              ) : (
                <div className="temperature">
                  {roundFahrenheit(weatherData.main.temp)}
                </div>
              )}
              <button
                className="temperature degree-btn"
                onClick={toggleDegrees}
              >
                °{degree}
              </button>
            </div>
            <div>
              {degree === "C" ? (
                <div className="detail-temperature">
                  Feels Like: {roundCelsius(weatherData.main.feels_like)}°
                  {degree} | Low: {roundCelsius(weatherData.main.temp_min)}°
                  {degree} | High: {roundCelsius(weatherData.main.temp_max)}°
                  {degree}
                </div>
              ) : (
                <div className="detail-temperature">
                  Feels Like: {roundFahrenheit(weatherData.main.feels_like)}°
                  {degree} | Low: {roundFahrenheit(weatherData.main.temp_min)}°
                  {degree} | High: {roundFahrenheit(weatherData.main.temp_max)}°
                  {degree}
                </div>
              )}
            </div>

            <div className="weather-detail">
              {weatherData.weather[0].main}
              <br></br>
              Humidity: {weatherData.main.humidity}%
              <br></br>
              Wind: {convertWindMPH(weatherData.wind.speed)} MPH{" "}
              {getWindDirection(weatherData.wind.deg)}
            </div>
          </div>
        </div>
      ) : (
        <div className="weather-box">
          <div className="weather-detail">
            Please Enter a City to get Weather Info
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
