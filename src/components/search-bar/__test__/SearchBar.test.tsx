import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
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
  const searchProps = jest.fn();
  const getBackground = jest.fn();
  ReactDOM.render(<SearchBar searchProps={searchProps} getBackground={getBackground} />, div);
});

it("Renders with placeholder text correctly", () => {
  const searchProps = jest.fn();
  const getBackground = jest.fn();
  const { queryByTestId, queryByPlaceholderText } = render(<SearchBar 
    searchProps={searchProps} 
    getBackground={getBackground} />);
  expect(queryByTestId("search-input-test")).toBeTruthy();
  expect(queryByPlaceholderText("Search City")).toBeTruthy();
});

it("Search bar snapshot test", () => {
  const searchProps = jest.fn();
  const getBackground = jest.fn();
  const tree = renderer.create(<SearchBar searchProps={searchProps} 
    getBackground={getBackground} />).toJSON();
  expect(tree).toMatchSnapshot();
});

/*describe("Input value", () => {
  it("Updates on change", () => {
    const search = jest.fn();
    const { queryByPlaceholderText, getByTestId } = render(
      <SearchBar search={search} />
    );

    const searchInput = queryByPlaceholderText("Search City");

    fireEvent.change(searchInput, { target: { value: "dallas" } });
    expect(searchInput.value).toBe("dallas");

    fireEvent.keyPress(getByTestId("search-input-test"), {
      key: "Enter",
      code: "Enter",
    });
    //expect(search).toHaveBeenCalled();
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
});*/
