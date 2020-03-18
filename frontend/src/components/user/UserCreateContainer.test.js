import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UserCreateContainer from "./UserCreateContainer";
import UserForm from "./UserForm";
import RecapUserForm from "./RecapUserForm";

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = mount(<UserCreateContainer />);
  wrapper.state().step = 0;
  wrapper.state().user = {
    firstName: "",
    lastName: "",
    email: "",
    role: ""
  };
});

describe("UserCreateContainer tests", () => {
  it("Should exist", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("Should have a title", () => {
    expect(global.window.document.title).toBe("Admin / Création d'utilisateur");
  });

  it("Should have UserForm as a child when step state === 0", () => {
    wrapper.setState({ step: 0 });
    const container = wrapper.find(UserForm);
    expect(container).toHaveLength(1);
  });

  it("Should have RecapUserForm as a child when step state === 1", () => {
    wrapper.setState({ step: 1 });
    const container = wrapper.find(RecapUserForm);
    expect(container).toHaveLength(1);
  });

  it("Should call changeStep() props onsubmit in user form (component children) and change state", () => {
    const form = wrapper.find(UserForm).find("form");
    const fn = wrapper.find(UserForm).props().changeStep;
    form.simulate("submit", fn(1, Object));
    expect(wrapper.state().step).toEqual(1);
  });

  it("Should call changeStep() props onsubmit in user form (component children) and change state", () => {
    const user = {
      firstName: "Yuu",
      lastName: "Mess",
      email: "youcef.messao@gmail.com",
      role: ""
    };
    const container = wrapper.find(UserForm);
    const form = container.find("form");
    container.instance().setState({ user });
    const fn = container.props().changeStep;
    form.simulate("submit", fn(Number, Object));
    expect(wrapper.state().user).toEqual(user);
  });
});
