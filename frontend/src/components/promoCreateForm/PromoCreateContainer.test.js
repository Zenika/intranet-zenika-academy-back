import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PromoCreateContainer } from "./PromoCreateContainer";
import PromoCreateStepOne from "./PromoCreateStepOne";
import { PromoCreateStepTwo } from "./PromoCreateStepTwo";
import { PromoCreateStepThree } from "./PromoCreateStepThree";
import { PromoCreateStepFour } from "./PromoCreateStepFour";
import PromoCreateResume from "./PromoCreateResume";

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = mount(<PromoCreateContainer />);
  wrapper.state().program = [
    { label: "js", value: 2 },
    { label: "java", value: 4 }
  ];
});

describe("PromoCreateContainer tests", () => {
  it("Should exist", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("Should have a title", () => {
    expect(global.window.document.title).toBe("Création de promotion");
  });

  it("Should have PromoCreateStepOne as a child", () => {
    const container = wrapper.find(PromoCreateStepOne);
    expect(container).toHaveLength(1);
  });

  it("Should change promo name state with handleChange() on PromoCreateStepOne pomoName input", () => {
    const container = wrapper.find(PromoCreateStepOne);
    const input = container.find("#promoName");
    const mockEvent = {
      target: {
        name: "title",
        value: "test"
      }
    };
    input.simulate("change", mockEvent);
    expect(wrapper.state().title).toEqual("test");
  });

  it("Should change promo city state with handleChange() on PromoCreateStepOne city input", () => {
    const container = wrapper.find(PromoCreateStepOne);
    const input = container.find("#city");
    const mockEvent = {
      target: {
        name: "city",
        value: "Paris"
      }
    };
    input.simulate("change", mockEvent);
    expect(wrapper.state().city).toEqual("Paris");
  });

  it("Should have PromoCreateStepTwo as a child when step state === 2", () => {
    wrapper.setState({ step: 2 });
    const container = wrapper.find(PromoCreateStepTwo);
    expect(container).toHaveLength(1);
  });

  it("Should have PromoCreateStepThree as a child when step state === 3", () => {
    wrapper.setState({ step: 3 });
    const container = wrapper.find(PromoCreateStepThree);
    expect(container).toHaveLength(1);
  });

  it("Should have PromoCreateStepFour as a child when step state === 4", () => {
    wrapper.setState({ step: 4 });
    const container = wrapper.find(PromoCreateStepFour);
    expect(container).toHaveLength(1);
  });

  it("Should have PromoCreateResume as a child when step state === 5", () => {
    wrapper.setState({ step: 5 });
    const container = wrapper.find(PromoCreateResume);
    expect(container).toHaveLength(1);
  });
});
