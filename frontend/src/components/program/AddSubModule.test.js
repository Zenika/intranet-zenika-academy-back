import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import crypto from 'crypto';
import Submodule from './AddSubModule';
import Sequence from './AddSequence';
import Module from './AddModule';

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <Submodule
      id={0}
      key="test-sub"
      deleteIt="test-sub"
      title=""
      content={[]}
      handleChange={jest.fn()}
      handleAddSequenceContent={jest.fn()}
      deleteSubModule={jest.fn()}
    />,
  );
  wrapper.state().sequences = [];
  wrapper.state().idSequence = 0;
  wrapper.state().subModule = {
    title: '',
    type: 3,
    content: [],
  };
});

describe('AddSubmodule tests', () => {
  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have a delete button', () => {
    const button = wrapper.find('#deleteSubModule');
    expect(button).toHaveLength(1);
  });

  it('Should have a add Sequence button', () => {
    const button = wrapper.find('#addSequence');
    expect(button).toHaveLength(1);
  });

  it('Should add a Sequence (child component) on Add Sequence button click', async () => {
    const btn = wrapper.find('#addSequence');
    const instance = wrapper.instance();
    const fn = jest.spyOn(instance, 'addSequence');

    expect(wrapper.state().idSequence).toEqual(0);
    expect(wrapper.state().sequences[0]).toBeUndefined();
    expect(wrapper.state().subModule.content[0]).toBeUndefined();

    btn.simulate('click', fn);
    expect(fn).toHaveBeenCalledTimes(1);

    await wrapper.update();
    const id = wrapper.state().idSequence - 1;
    expect(wrapper.state().idSequence).toEqual(1);
    expect(wrapper.state().sequences[id]).toBeInstanceOf(Object);
    expect(wrapper.state().subModule.content[id]).toBeInstanceOf(Object);
    fn.mockClear();
  });

  it('Should change submodule title on title input change', () => {
    wrapper = mount(
      <Module
        id={0}
        key="test"
        deleteIt="test"
        title=""
        content={[]}
        handleChange={jest.fn()}
        handleAddSubModuleContent={jest.fn()}
        handleAddSequenceContent={jest.fn()}
        deleteModule={jest.fn()}
      />,
    );
    wrapper.state().subModules = [{ key: 'test-sub', id: 0 }];
    wrapper.state().idSubModules = 1;
    wrapper.state().module = {
      title: '',
      type: 2,
      content: [{ title: '', type: 3, content: [] }],
    };
    const id = wrapper.state().idSubModules - 1;
    const moduleChild = mount(
      <Submodule
        id={0}
        key="test-sub"
        deleteIt="test-sub"
        title={wrapper.state().module.content[id].title}
        content={[]}
        handleChange={wrapper.instance().handleChange}
        handleAddSequenceContent={jest.fn()}
        deleteSubModule={jest.fn()}
      />,
    );
    const input = moduleChild.find('input');
    const mockEvent = {
      target: {
        name: 'title',
        value: 'SubModule test',
        id,
      },
    };
    input.simulate('change', mockEvent);
    wrapper.update();
    const title = wrapper.find('#subModuleTitle span').text();
    expect(title).toEqual('SubModule test');
  });

  it('Should call parent delete function on delete sub module button click', () => {
    const btn = wrapper.find('#deleteSubModule');
    const fn = wrapper.props().deleteSubModule;
    btn.simulate('click', fn('test-sub', 0));
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('Should delete Sequence from SubModule on children component delete button click', () => {
    wrapper = mount(
      <Submodule
        id={0}
        key="test-sub"
        deleteIt="test-sub"
        title=""
        content={[]}
        handleChange={jest.fn()}
        handleAddSequenceContent={jest.fn()}
        deleteSubModule={jest.fn()}
      />,
    );
    const moduleChild = mount(
      <Sequence
        id={0}
        key="test-seq"
        deleteIt="test-seq"
        title=""
        content={[]}
        handleChange={jest.fn()}
        deleteSequence={wrapper.instance().deleteSequence}
      />,
    );
    wrapper.state().sequences = [{ key: 'test-seq', id: 0 }];
    wrapper.state().idSequence = 1;
    wrapper.state().subModule = {
      title: '',
      type: 3,
      content: [{ title: 'sequence', type: 4, content: [] }],
    };
    const btnDelete = moduleChild.find('#deleteSequence');
    let id = wrapper.state().idSequence - 1;
    expect(wrapper.state().idSequence).toEqual(1);
    expect(wrapper.state().sequences[id]).toBeInstanceOf(Object);
    expect(wrapper.state().subModule.content[id]).toBeInstanceOf(Object);

    btnDelete.simulate('click');

    wrapper.instance().forceUpdate();
    id = wrapper.state().idSequence;
    expect(wrapper.state().sequences[id]).toBeUndefined();
    expect(wrapper.state().subModule.content[id]).toBeUndefined();
    expect(wrapper.state().idSequence).toEqual(0);
  });
});
