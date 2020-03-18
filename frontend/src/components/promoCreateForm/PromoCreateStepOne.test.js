import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PromoCreateStepOne from "./PromoCreateStepOne";
import DatePicker from "../datepicker/DatePicker";
import { BulmaSteps } from "../bulma-steps/BulmaSteps";

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <PromoCreateStepOne
      nextStep={jest.fn()}
      step={1}
      promo={Object}
      handleChange={jest.fn()}
      handleMultiChange={jest.fn()}
    />
  );
});

describe("PromoCreateStepOne tests", () => {
  it("Should exist", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("Should have promoCreateForm className", () => {
    const container = wrapper.find(".promoCreateForm");
    expect(container).toHaveLength(1);
  });

  it("Should have a cancel button", () => {
    const container = wrapper.find("#cancelButton");
    expect(container).toHaveLength(1);
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

  it("Should have 2 DatePicker as children", () => {
    const container = wrapper.find(DatePicker);
    expect(container).toHaveLength(2);
  });

  it("Should have BulmaSteps as a child", () => {
    const container = wrapper.find(BulmaSteps);
    expect(container).toHaveLength(1);
  });
});
