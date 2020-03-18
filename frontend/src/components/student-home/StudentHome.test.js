import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StudentHome from "./StudentHome";

Enzyme.configure({ adapter: new Adapter() });

describe("StudentHome component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<StudentHome />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("matches snapshot", () => {
    const component = renderer.create(<StudentHome />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
