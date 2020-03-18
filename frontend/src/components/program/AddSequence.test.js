import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import crypto from "crypto";
import Sequence from "./AddSequence";
import Submodule from "./AddSubModule";

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(global.self, "crypto", {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
});

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <Sequence
      id={0}
      key="test-seq"
      deleteIt="test-seq"
      title=""
      content={[]}
      handleChange={jest.fn()}
      deleteSequence={jest.fn()}
    />
  );
  wrapper.state().sequence = {
    title: "",
    id: 0
  };
});

describe("AddSequence tests", () => {
  it("Should exist", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("Should have a delete button", () => {
    const button = wrapper.find("#deleteSequence");
    expect(button).toHaveLength(1);
  });

  it("Should change submodule title on title input change", () => {
    wrapper = mount(
      <Submodule
        id={0}
        key="test-sub"
        deleteIt="test-seq"
        title=""
        content={[]}
        handleChange={jest.fn()}
        handleAddSequenceContent={jest.fn()}
        deleteSubModule={jest.fn()}
      />
    );
    wrapper.state().sequences = [{ key: "test-seq", id: 0 }];
    wrapper.state().idSequence = 1;
    wrapper.state().subModule = {
      title: "",
      type: 3,
      content: [{ title: "", type: 4, content: [] }]
    };
    const id = wrapper.state().idSequence - 1;
    const moduleChild = mount(
      <Sequence
        id={0}
        key="test-seq"
        deleteIt="test-seq"
        title={wrapper.state().subModule.content[id].title}
        handleChange={wrapper.instance().handleChange}
        deleteSequence={jest.fn()}
      />
    );
    const input = moduleChild.find("input");
    const mockEvent = {
      target: {
        name: "title",
        value: "Sequence test",
        id
      }
    };
    input.simulate("change", mockEvent);
    wrapper.update();
    const title = wrapper.find("#sequenceTitle span").text();
    expect(title).toEqual("Sequence test");
  });

  it("Should call parent delete function on delete sequence button click", () => {
    const btn = wrapper.find("#deleteSequence");
    const fn = wrapper.props().deleteSequence;
    btn.simulate("click", fn("test-seq", 0));
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
