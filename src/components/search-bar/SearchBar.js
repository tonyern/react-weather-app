import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./search-bar.css";

const SearchBar = ({ searchProps }) => {
  const openWeatherMapAPI = {
    key: "8713314e929a6ae57041a78e979b402d",
    base: "http://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const search = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(
          `${openWeatherMapAPI.base}weather?q=${query}&units=metric&APPID=${openWeatherMapAPI.key}`
        )
        .then((response) => {
          setQuery("");
          searchProps(response.data);
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

  return (
    <div className="search-box">
      <input
        type="text"
        ref={inputRef}
        className="search-bar"
        data-testid="search-input-test"
        placeholder="Search City"
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        onKeyPress={search}
      />
    </div>
  );
};

export default SearchBar;
