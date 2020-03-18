import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UserForm from "./UserForm";

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = mount(<UserForm user={Object} changeStep={jest.fn()} />);
});

describe("UserForm tests", () => {
  it("Should exist", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("Should have a title", () => {
    expect(global.window.document.title).toBe("Admin / Création d'utilisateur");
  });

  it("Should change user last name state with handleChange() on UserForm last name input", () => {
    const input = wrapper.find("#userLastName");
    const mockEvent = {
      target: {
        name: "lastName",
        value: "Mess"
      }
    };
    input.simulate("change", mockEvent);
    expect(wrapper.state().user.lastName).toEqual("Mess");
  });

  it("Should change user first name state with handleChange() on UserForm first name input", () => {
    const input = wrapper.find("#userFirstName");
    const mockEvent = {
      target: {
        name: "firstName",
        value: "Yuu"
      }
    };
    input.simulate("change", mockEvent);
    expect(wrapper.state().user.firstName).toEqual("Yuu");
  });

  it("Should change user email state with handleChange() on UserForm first name input", () => {
    const input = wrapper.find("#userEmail");
    const mockEvent = {
      target: {
        name: "email",
        value: "youcef.messao@gmail.com"
      }
    };
    input.simulate("change", mockEvent);
    expect(wrapper.state().user.email).toEqual("youcef.messao@gmail.com");
  });

  it("Should have a validate button", () => {
    const button = wrapper.find("#validateButton");
    expect(button).toHaveLength(1);
  });

  it("Should have a cancel button", () => {
    const button = wrapper.find("#cancelButton");
    expect(button).toHaveLength(1);
  });

  it("Should have /home/admin in cancel button href ", () => {
    const button = wrapper.find("#cancelButton");
    expect(button.props().href).toEqual("/home/admin/");
  });

  it("Should call changeStep() props onsubmit", () => {
    const form = wrapper.find("form");
    const fn = wrapper.props().changeStep;
    form.simulate("submit", fn(1, Object));
    expect(fn).toHaveBeenCalled();
  });
});
