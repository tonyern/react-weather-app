import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import WeatherInfo from "../WeatherInfo";

it("Renders correctly", () => {
  const weatherData = jest.fn();
  const { queryByTestId, queryByPlaceholderText } = render(
    <WeatherInfo weatherData={weatherData} />
  );
  expect(queryByTestId("weather-info-test")).toBeTruthy();
});
