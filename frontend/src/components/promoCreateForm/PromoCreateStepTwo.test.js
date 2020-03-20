import React from 'react';
import Enzyme, { mount } from 'enzyme';
import axios from 'axios';
import Adapter from 'enzyme-adapter-react-16';
import { PromoCreateStepTwo } from './PromoCreateStepTwo';
import CreatableSelect from '../searchbarauto/CreatableSearchbar';
import { BulmaSteps } from '../bulma-steps/BulmaSteps';

jest.mock('axios', () => {
  const data = [
    {
      id: 1,
      title: 'java',
      content: '1;2',
      createdAt: '2028-11-19T00:00:00.000Z',
      updatedAt: '2028-11-19T00:00:00.000Z',
    },
    {
      id: 2,
      title: 'js',
      content: '1;2',
      createdAt: '2028-11-19T00:00:00.000Z',
      updatedAt: '2028-11-19T00:00:00.000Z',
    },
    {
      title: 'css',
      content: '1;2',
      createdAt: '2028-11-19T00:00:00.000Z',
      updatedAt: '2028-11-19T00:00:00.000Z',
    },
  ];
  return {
    get: jest.fn().mockReturnValue(Promise.resolve(data)),
  };
});

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let mockAxios;
beforeEach(() => {
  mockAxios = jest.spyOn(axios, 'get');

  wrapper = mount(
    <PromoCreateStepTwo
      nextStep={jest.fn()}
      step={2}
      promo={Object}
      handleChange={jest.fn()}
      handleMultiChange={jest.fn()}
      prevStep={jest.fn()}
    />,
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

jest.useFakeTimers();

describe('api call on did mount', () => {
  it('Should get all programs from api on mount', () => {
    jest.runAllTimers();
    expect(mockAxios).toHaveBeenCalledTimes(1);
  });
});

describe('PromoCreateStepTwo tests', () => {
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

  it('Should have a resume button', () => {
    const container = wrapper.find('#resumeButton');
    expect(container).toHaveLength(1);
  });

  it('Should call nexStep() props on resume button click', () => {
    const button = wrapper.find('#resumeButton');
    const fn = wrapper.props().nextStep;
    button.simulate('click');
    expect(fn).toHaveBeenCalled();
  });

  it('Should have BulmaSteps as a child', () => {
    const container = wrapper.find(BulmaSteps);
    expect(container).toHaveLength(1);
  });

  it('Should have one CreateTableSelect component as child', () => {
    const container = wrapper.find(CreatableSelect);
    expect(container).toHaveLength(1);
  });
});
