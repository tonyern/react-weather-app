import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WeatherInfo from "../WeatherInfo";

it("Renders correctly", () => {
  const weatherData = jest.fn();
  const { queryByTestId, queryByPlaceholderText } = render(
    <WeatherInfo weatherData={weatherData} />
  );
  expect(queryByTestId("weather-info-test")).toBeTruthy();
});
