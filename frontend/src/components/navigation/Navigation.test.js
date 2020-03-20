import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import NavigationBar from './Navigation';

describe('Navbar renders correctly', () => {
  const navbar = mount(<NavigationBar />);

  beforeEach(() => {
    navbar.instance();
  });

  test('it renders correctly', () => {
    expect(navbar).toMatchSnapshot();
  });
  test('Displays the connexion Modal when sign in button is clicked', () => {
    const siButton = navbar.find('.signInDesktop');
    siButton.simulate('click');

    expect(navbar).toMatchSnapshot();
    expect(navbar.find('#modalLogin').children()).toBeDefined();
  });
});

describe('Testing Class Methods components', () => {
  const navbar = shallow(<NavigationBar ev />);
  const navbarInstance = navbar.instance();
  test('Corresponding Class method should be called when sign in button is clicked', () => {
    const ev = true;
    jest.spyOn(navbarInstance, 'toggleModal');

    const siButton = navbar.find('.signInDesktop');
    siButton.simulate('click');

    expect(navbarInstance.toggleModal).toHaveBeenCalledWith(ev);
  });
});

describe("Navigation bar when the user isn't connected", () => {
  const navbar = shallow(<NavigationBar />);
  const navbarInstance = navbar.instance();
  const nav = <NavigationBar />;

  test('Navigation bar displays a sign in button', () => {
    expect(nav).toBeDefined();
    expect(TestUtils.isElement(nav)).toBe(true);
    expect(TestUtils.isElementOfType(nav, NavigationBar)).toBe(true);

    const rendered = TestUtils.renderIntoDocument(<NavigationBar />);
    const siButton = TestUtils.findRenderedDOMComponentWithClass(
      rendered,
      'signInDesktop',
    );

    expect(siButton.textContent).toEqual('Se connecter');
  });

  beforeEach(() => {
    navbarInstance.componentDidMount();
  });

  test('Shallow rendering', () => {
    expect(navbar.state('modalState')).toBe('');
    expect(navbar.state('loggedIn')).toBe(false);
  });

  test('State mutates after clicking on sign in button', () => {
    const siButton = navbar.find('.signInDesktop');
    siButton.simulate('click');

    expect(navbar.state('modalState')).toBe(true);
    expect(navbar.state('loggedIn')).toBe(false);
  });
});
