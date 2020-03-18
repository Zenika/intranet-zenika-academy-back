import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProgramFormContainer from "./ProgramFormContainer";
import ProgramForm from "./ProgramForm";
import RecapProgramForm from "./RecapProgramForm";

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = mount(<ProgramFormContainer match={{ params: {} }} />);
  wrapper.state().step = 0;
  wrapper.state().program = {
    title: "",
    type: 1,
    content: []
  };
});

describe("ProgramFormContainer tests", () => {
  it("Should exist", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("Should have a title", () => {
    expect(global.window.document.title).toBe("Admin / Programme création");
  });

  it("Should have ProgramForm as a child when step state === 0", () => {
    wrapper.setState({ step: 0 });
    const container = wrapper.find(ProgramForm);
    expect(container).toHaveLength(1);
  });

  it("Should have RecapProgramForm as a child when step state === 1", () => {
    wrapper.setState({ step: 1 });
    const container = wrapper.find(RecapProgramForm);
    expect(container).toHaveLength(1);
  });

  it("Should call handleChange() props onsubmit in program form (component children) and change state", () => {
    const program = {
      title: "Titre test",
      type: 1,
      content: []
    };
    const container = wrapper.find(ProgramForm);
    const btn = container.find("#validateProgramForm");
    container.instance().setState({ program });
    const fn = container.props().handleChange;
    btn.simulate("click", fn({ target: { value: "1" } }, program));
    expect(wrapper.state().program).toEqual(program);
    expect(wrapper.state().step).toEqual(1);
  });

  it("Should call handleChange() props on modify button click in program recap (component children) and change state", () => {
    const program = {
      title: "Titre test",
      type: 1,
      content: []
    };
    wrapper.setState({ step: 1 });
    const container = wrapper.find(RecapProgramForm);
    const btn = container.find("#modifyButton");
    container.instance().setState({ program });
    const fn = container.props().handleChange;
    btn.simulate("click", fn({ target: { value: "0" } }, program));
    expect(wrapper.state().step).toEqual(0);
  });
});
