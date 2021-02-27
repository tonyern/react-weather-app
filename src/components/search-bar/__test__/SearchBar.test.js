import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import SearchBar from "../SearchBar";

/**
 * What needs to be tested:
 *
 * 1) Does it render successfully?
 * 2) Is the hook query set to "" as default?
 * 3) Is the ref hook initialized with no problem?
 * 4) Does the hook useEffect focus the ref hook?
 * 5) Does the search function get API data and catch errors?
 */

it("Search bar renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchBar />, div);
});

it("Renders correctly", () => {
  const { queryByTestId, queryByPlaceholderText } = render(<SearchBar />);
  expect(queryByTestId("search-input-test")).toBeTruthy();
  expect(queryByPlaceholderText("Search City")).toBeTruthy();
});

describe("Input value", () => {
  it("Updates on change", () => {
    const { queryByPlaceholderText } = render(<SearchBar />);

    const searchInput = queryByPlaceholderText("Search City");

    fireEvent.change(searchInput, { target: { value: "dallas" } });

    expect(searchInput.value).toBe("dallas");
  });
});

describe("Search functionality", () => {
  describe("Empty query", () => {
    it("Trigger search function but no data from API", () => {
      const search = jest.fn();

      const { queryByTestId, queryByPlaceholderText } = render(
        <SearchBar search={search} />
      );

      fireEvent.submit(queryByTestId("search-input-test"));
      expect(search).not.toHaveBeenCalled();
    });
  });

  describe("Non-empty query", () => {
    it("Trigger search function but data from API", () => {
      const search = jest.fn();

      const { queryByTestId, queryByPlaceholderText } = render(
        <SearchBar search={search} />
      );

      const searchInput = queryByPlaceholderText("Search City");
      fireEvent.change(searchInput, { target: { value: "dallas" } });

      fireEvent.submit(queryByTestId("search-input-test"));
      expect(search).not.toHaveBeenCalled();
    });
  });
});
