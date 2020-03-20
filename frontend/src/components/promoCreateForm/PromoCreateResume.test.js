import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PromoCreateResume from './PromoCreateResume';
import { BulmaSteps } from '../bulma-steps/BulmaSteps';

Enzyme.configure({ adapter: new Adapter() });

const promo = {
  title: 'test',
  startDate: '2019-01-01',
  endDate: '2019-01-01',
  program: [
    { label: 'js', value: 2 },
    { label: 'java', value: 4 },
  ],
  teachers: [],
  students: [],
  city: 'testCity',
};

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <PromoCreateResume prevStep={jest.fn()} step={5} promo={promo} />,
  );
});

describe('PromoCreateResume tests', () => {
  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have promoCreateForm className', () => {
    const container = wrapper.find('.promoCreateForm');
    expect(container).toHaveLength(1);
  });

  it('Should have a previous button', () => {
    const container = wrapper.find('#previousButton');
    expect(container).toHaveLength(1);
  });

  it('Should call prevStep() props on resume button click', () => {
    const button = wrapper.find('#previousButton');
    const fn = wrapper.props().prevStep;
    button.simulate('click');
    expect(fn).toHaveBeenCalled();
  });

  it('Should have a confirm button', () => {
    const container = wrapper.find('#confirmButton');
    expect(container).toHaveLength(1);
  });

  // it('Should call handleCreate() props on confirm button click', () => {
  //   const button = wrapper.find('#confirmButton');
  //   const handleCreate = jest.fn();
  //   button.simulate('click');
  //   expect(handleCreate).toHaveBeenCalled();
  // });

  it('Should have BulmaSteps as a child', () => {
    const container = wrapper.find(BulmaSteps);
    expect(container).toHaveLength(1);
  });
});
