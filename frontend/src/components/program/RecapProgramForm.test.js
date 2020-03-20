import React from 'react';
import Axios from 'axios';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RecapProgramForm from './RecapProgramForm';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

jest.mock('axios', () => {
  const data = {
    data: {
      message: 'Created',
    },
  };
  return {
    post: jest.fn().mockReturnValue(Promise.resolve(data)),
  };
});

const program = {
  title: 'Progamme Test Java',
  type: 1,
  content: [
    {
      title: 'Module Test Java',
      type: 2,
      content: [
        {
          title: 'Sous moduleTest Java',
          type: 3,
          content: [
            {
              title: 'Sequence Test Java',
              type: 4,
              content: [{}],
            },
          ],
        },
      ],
    },
  ],
};

beforeEach(() => {
  wrapper = mount(
    <RecapProgramForm program={program} edit={0} handleChange={jest.fn()} />,
  );
});

describe('Recap Program tests', () => {
  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have a create button', () => {
    const button = wrapper.find('#createButton');
    expect(button).toHaveLength(1);
  });

  it('Should have a modify button', () => {
    const button = wrapper.find('#modifyButton');
    expect(button).toHaveLength(1);
  });

  it('Should have a cancel button', () => {
    const button = wrapper.find('#cancelButton');
    expect(button).toHaveLength(1);
  });

  it('Should have right information in recap', () => {
    const totalLi =
      wrapper.props().program.content.length +
      wrapper.props().program.content[0].content.length +
      wrapper.props().program.content[0].content[0].content.length;
    expect(wrapper.find('li')).toHaveLength(totalLi);
    expect(wrapper.find('#recapProgramList')).toHaveLength(1);
    expect(wrapper.find('#moduleTitle-0 span').text()).toEqual(
      wrapper.props().program.content[0].title,
    );
    expect(wrapper.find('#subModuleTitle-0 span').text()).toEqual(
      wrapper.props().program.content[0].content[0].title,
    );
    expect(wrapper.find('#sequenceTitle-0 span').text()).toEqual(
      wrapper.props().program.content[0].content[0].content[0].title,
    );
  });

  it('Should call axios post with program info when you click on create button', () => {
    const button = wrapper.find('#createButton');
    const state = wrapper.props().program;
    const getSpy = jest.spyOn(Axios, 'post');
    button.simulate('click', {
      preventDefault: () => {},
    });
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('/api/programs', state);
    getSpy.mockClear();
  });

  it('Should call handleChange on modify button click to come back on previous step (create program form)', () => {
    const button = wrapper.find('#modifyButton');
    const state = wrapper.props().program;
    const fn = wrapper.props().handleChange;
    button.simulate('click', fn({ target: { value: '1' } }, state));
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('Should have /home/admin in cancel button href ', () => {
    const button = wrapper.find('#cancelButton');
    expect(button.props().href).toEqual('/home/admin/');
  });
});
