import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./search-bar.css";

// @ts-ignore
const SearchBar = ({ searchProps }): JSX.Element => {
  const openWeatherMapAPI = {
    key: "8713314e929a6ae57041a78e979b402d",
    base: "http://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const search = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      axios
        .get(
          `${openWeatherMapAPI.base}weather?q=${query}&units=metric&APPID=${openWeatherMapAPI.key}`
        )
        .then((response: AxiosResponse<any>) => {
          searchProps(response.data);
          console.log(response.data);
        })
        .catch((error: any) => {
          // Error if city name was not found or invalid input.
          if (error.response) console.log(error.response.data);
          
          // Error if no response was received.
          if (error.request) console.log(error.request);

          // Other errors.
          console.log(error.message);
        });

      setQuery("");
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
        onKeyPress={(event: React.KeyboardEvent<HTMLDivElement>) => search(event)}
      />
    </div>
  );
};

export default SearchBar;