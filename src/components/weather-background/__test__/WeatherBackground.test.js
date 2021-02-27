import React from "react";
import ReactDOM from "react-dom";
import render, { fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import WeatherBackground from "../WeatherBackground";

it("Weather background renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<WeatherBackground />, div);
});

it("Weather background snapshot test", () => {
  const tree = renderer.create(<WeatherBackground />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Testing calls to changeBackground function", () => {
  const div = document.createElement("div");
  const result = ReactDOM.render(<WeatherBackground />, div);

  const changeBackground = jest.fn();
});

it("Making sure weather hook exist with no problem", () => {
  const { result } = renderHook(() => WeatherBackground());
  expect(result.current.weather).toBe();
});
