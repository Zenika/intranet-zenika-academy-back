import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import crypto from "crypto";
import ProgramForm from "./ProgramForm";
import Module from "./AddModule";

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(global.self, "crypto", {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
});

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <ProgramForm
      program={{
        title: "",
        type: 1,
        content: []
      }}
      handleChange={jest.fn()}
    />
  );
  wrapper.state().modules = [];
  wrapper.state().idModules = 0;
});

describe("ProgramForm tests", () => {
  it("Should exist", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it("Should have a cancel button", () => {
    const button = wrapper.find("#cancelButton");
    expect(button).toHaveLength(1);
  });

  it("Should have a validate button", () => {
    const button = wrapper.find("#validateProgramForm");
    expect(button).toHaveLength(1);
  });

  it("Should have a clear button", () => {
    const button = wrapper.find("#clearProgram");
    expect(button).toHaveLength(1);
  });

  it("Should have a add Module button", () => {
    const button = wrapper.find("#addModule");
    expect(button).toHaveLength(1);
  });

  it("Should not have a module as a child if program is empty", () => {
    const container = wrapper.find(Module);
    expect(container).toHaveLength(0);
  });

  it("Should have /home/admin in cancel button href ", () => {
    const button = wrapper.find("#cancelButton");
    expect(button.props().href).toEqual("/home/admin/");
  });

  it("Should change program title in state on programTitle input change", () => {
    const input = wrapper.find("#programTitle");
    const mockEvent = {
      target: {
        name: "title",
        value: "Programme test"
      }
    };
    input.simulate("change", mockEvent);
    expect(wrapper.state().program.title).toEqual("Programme test");
  });

  it("Should reset all Program data on clearProgram button click", () => {
    const instance = wrapper.instance();
    const input = wrapper.find("#programTitle");
    const btn = wrapper.find("#clearProgram");
    const fn = jest.spyOn(instance, "clearProgram");
    wrapper.state().modules = [{ id: 0, key: "keyTest123" }];
    wrapper.state().idModules = 1;
    wrapper.state().program.content = [
      {
        title: "",
        type: 2,
        content: []
      }
    ];

    const mockEvent = {
      target: {
        name: "title",
        value: "Programme test"
      }
    };
    input.simulate("change", mockEvent);
    expect(wrapper.state().program.title).toEqual("Programme test");
    expect(wrapper.state().idModules).toEqual(1);
    expect(wrapper.state().modules).toEqual([{ id: 0, key: "keyTest123" }]);
    expect(wrapper.state().program.content).toEqual([
      {
        title: "",
        type: 2,
        content: []
      }
    ]);

    btn.simulate("click");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(wrapper.state().program.title).toEqual("");
    expect(wrapper.state().idModules).toEqual(0);
    expect(wrapper.state().modules).toEqual([]);
    expect(wrapper.state().program.content).toEqual([]);
  });

  it("Should add a Module (child component) on Add module button click", async () => {
    const btn = wrapper.find("#addModule");
    const instance = wrapper.instance();
    const fn = jest.spyOn(instance, "addModule");

    expect(wrapper.state().idModules).toEqual(0);
    expect(wrapper.state().modules[0]).toBeUndefined();
    expect(wrapper.state().program.content[0]).toBeUndefined();

    btn.simulate("click", fn);
    expect(fn).toHaveBeenCalledTimes(1);

    await wrapper.update();
    const id = wrapper.state().idModules - 1;
    expect(wrapper.state().idModules).toEqual(1);
    expect(wrapper.state().modules[id]).toBeInstanceOf(Object);
    expect(wrapper.state().program.content[id]).toBeInstanceOf(Object);
    fn.mockClear();
  });

  it("Should delete Module from Program on children component delete button click", () => {
    wrapper = mount(
      <ProgramForm
        program={{
          title: "",
          type: 1,
          content: [{ title: "module", type: 2, content: [] }]
        }}
        handleChange={jest.fn()}
      />
    );
    const moduleChild = mount(
      <Module
        id={0}
        key="test"
        deleteIt="test"
        title={wrapper.state().title}
        content={[]}
        handleChange={jest.fn()}
        handleAddSubModuleContent={jest.fn()}
        handleAddSequenceContent={jest.fn()}
        deleteModule={wrapper.instance().deleteModule}
      />
    );
    wrapper.state().modules = [{ key: "test", id: 0 }];
    wrapper.state().idModules = 1;

    const btnDelete = moduleChild.find("#deleteModule");
    let id = wrapper.state().idModules - 1;
    expect(wrapper.state().idModules).toEqual(1);
    expect(wrapper.state().modules[id]).toBeInstanceOf(Object);
    expect(wrapper.state().program.content[id]).toBeInstanceOf(Object);

    btnDelete.simulate("click");

    wrapper.instance().forceUpdate();
    id = wrapper.state().idModules;
    expect(wrapper.state().modules[id]).toBeUndefined();
    expect(wrapper.state().program.content[id]).toBeUndefined();
    expect(wrapper.state().idModules).toEqual(0);
  });
});
