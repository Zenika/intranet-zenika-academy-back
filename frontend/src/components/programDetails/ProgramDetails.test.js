import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import axios from "axios";
import Adapter from "enzyme-adapter-react-16";
import ProgramDetails from "./ProgramDetails";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");

describe("ProgramDetails component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ProgramDetails match={{ params: { id: 1 } }} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("matches snapshot", () => {
    const component = renderer.create(
      <ProgramDetails match={{ params: { id: 1 } }} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("when rendered", () => {
    it("should fetch a program details", () => {
      const getSpy = jest.spyOn(axios, "get");
      shallow(<ProgramDetails match={{ params: { id: 1 } }} />);
      expect(getSpy).toBeCalled();
    });
  });
});
