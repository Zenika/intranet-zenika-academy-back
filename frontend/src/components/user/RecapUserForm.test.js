import React from 'react';
import Axios from 'axios';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RecapUserForm from './RecapUserForm';

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

const user = {
  firstName: 'Yuu',
  lastName: 'Mess',
  email: 'youcef.messao@gmail.com',
  role: 'admin',
};

beforeEach(() => {
  wrapper = mount(<RecapUserForm user={user} changeStep={jest.fn()} />);
});

describe('UserForm tests', () => {
  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have a title', () => {
    expect(global.window.document.title).toBe(
      "Admin / Récapitulatif création d'utilisateur",
    );
  });

  it('Should have a create button', () => {
    const button = wrapper.find('#createButton');
    expect(button).toHaveLength(1);
  });

  it('Should have a cancel button', () => {
    const button = wrapper.find('#cancelButton');
    expect(button).toHaveLength(1);
  });

  it('Should have /home/admin in cancel button href ', () => {
    const button = wrapper.find('#cancelButton');
    expect(button.props().href).toEqual('/home/admin/');
  });

  it('Should have right information in recap', () => {
    let roleDetail;
    if (wrapper.state().user.role === 'admin') roleDetail = 'Administrateur';
    if (wrapper.state().user.role === 'teacher') roleDetail = 'Formateur';
    if (wrapper.state().user.role === 'student') roleDetail = 'Eleve';

    expect(wrapper.find('li')).toHaveLength(4);
    expect(wrapper.find('#recapUserList')).toHaveLength(1);
    expect(wrapper.find('#role span').text()).toEqual(roleDetail);
    expect(wrapper.find('#firstName span').text()).toEqual(
      wrapper.state().user.firstName,
    );
    expect(wrapper.find('#lastName span').text()).toEqual(
      wrapper.state().user.lastName,
    );
    expect(wrapper.find('#email span').text()).toEqual(
      wrapper.state().user.email,
    );
  });

  it('Should call axios post with user info when you click on create button', () => {
    const button = wrapper.find('#createButton');
    const state = wrapper.state().user;
    const getSpy = jest.spyOn(Axios, 'post');
    button.simulate('click', {
      preventDefault: () => {},
    });
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(
      '/api/users ',
      state,
    );
    getSpy.mockClear();
  });
});
