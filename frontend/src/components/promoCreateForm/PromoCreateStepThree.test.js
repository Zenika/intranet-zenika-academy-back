import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PromoCreateStepThree } from "./PromoCreateStepThree";
import { BulmaSteps } from "../bulma-steps/BulmaSteps";
import SearchbarAutoComplete from "../searchbarauto/SearchbarAuto";

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <PromoCreateStepThree
      nextStep={jest.fn()}
      step={3}
      promo={Object}
      handleChange={jest.fn()}
      handleMultiChange={jest.fn()}
      prevStep={jest.fn()}
    />
  );
});

describe("PromoCreateStepThree tests", () => {
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

  it("Should have one CreateTableSelect component as child", () => {
    const container = wrapper.find(SearchbarAutoComplete);
    expect(container).toHaveLength(1);
  });

  it("Should have BulmaSteps as a child", () => {
    const container = wrapper.find(BulmaSteps);
    expect(container).toHaveLength(1);
  });
});
