import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PromoCreateStepFour } from "./PromoCreateStepFour";
import { BulmaSteps } from "../bulma-steps/BulmaSteps";

Enzyme.configure({ adapter: new Adapter() });

const promo = {
  students: []
};

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <PromoCreateStepFour
      nextStep={jest.fn()}
      step={4}
      promo={promo}
      handleChange={jest.fn()}
      handleMultiChange={jest.fn()}
      prevStep={jest.fn()}
      handleCSVImport={jest.fn()}
      csv={Boolean}
      name="students"
    />
  );
});

describe("PromoCreateStepFour tests", () => {
  it("Should exist", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("Should have promoCreateForm className", () => {
    const container = wrapper.find(".promoCreateForm");
    expect(container).toHaveLength(1);
  });

  it("Should have a previous button", () => {
    const container = wrapper.find("#previousButton");
    expect(container).toHaveLength(1);
  });

  it("Should call prevStep() props on resume button click", () => {
    const button = wrapper.find("#previousButton");
    const fn = wrapper.props().prevStep;
    button.simulate("click");
    expect(fn).toHaveBeenCalled();
  });

  it("Should have a resume button", () => {
    const container = wrapper.find("#resumeButton");
    expect(container).toHaveLength(1);
  });

  it("Should call nexStep() props on resume button click", () => {
    const button = wrapper.find("#resumeButton");
    const fn = wrapper.props().nextStep;
    button.simulate("click");
    expect(fn).toHaveBeenCalled();
  });

  it("Should have BulmaSteps as a child", () => {
    const container = wrapper.find(BulmaSteps);
    expect(container).toHaveLength(1);
  });
});
