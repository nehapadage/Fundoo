import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
// import { mount, shallow, render } from ‘enzyme';
import Login from '../Components/Login'

// describe('Login', () => {
//     it('should render correctly in "debug" mode', () => {
//       const component = shallow(<Login debug />);
    
//       expect(component).toMatchSnapshot();
//     });
//   });

  describe('Login component tests', () => {

    const wrapper = shallow(<Login />);
    
    test('snapshot renders', () => {
      const component = renderer.create(<Login />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    // it('login button is clicked', () => {
    //     const wrapper = shallow(<Login />);
    //     const loginBtn = wrapper.find('button.loginButton');
    //     loginBtn.simulate('click');
    //     const text = wrapper.find('e').text();
    //     expect(text).toEqual('@');
    //   });
  });

  