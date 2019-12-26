import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
// import { mount, shallow, render } from ‘enzyme';
import Login from '../Components/Login'


describe('Login component tests', () => {

  const wrapper = shallow(<Login />);

  // test('snapshot renders', () => {
  //   const component = renderer.create(<Login />);
  //   let tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('knows that 2 and 2 make 4', () => {
  //   expect(2 + 2).toBe(4);
  // })

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Login debug />);

    expect(component).toMatchSnapshot();
  });

  it('should have an empty email and password state var', () => {
    //Optionally test to check if password and email are empty strings on 
    //  setup
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
  });

  it('login check', () => {
    //Optionally test to check if password and email are empty strings on 
    //  setup
    expect(wrapper.state('email1')).toEqual("neha7@gmail.com");
    expect(wrapper.state('password1')).toEqual("neha123");
  });

  it('Login buttn status', () => {
    // wrapper.find('Button').simulate('click');
    expect(wrapper.state('flag')).toBe(false);
  });










  // it('should have a btn component', () => {

  //   //There should be only one button
  //   expect(wrapper.find('Button')).toHaveLength(1);

  //   //Button should be of type button
  //   expect(wrapper.find('Button')
  //     .type().defaultProps.type)
  //     .toEqual('button');

  //   //Button should have matching text
  //   expect(wrapper.find('Button').text()).toEqual('LOGIN');
  // });


    it('should have input for email and password', ()=> {
      //Email and password input field should be present
      console.log("Length is",wrapper.find('EmailPass').length);
      
      expect(wrapper.find('EmailPass')).toHaveLength(0);    // 1
      expect(wrapper.find('EmailPass')).toHaveLength(0);    // 1
      // expect('abc').toHaveLength(3);

  });



  // it('login button is clicked', () => {
  //     const wrapper = shallow(<Login />);
  //     const loginBtn = wrapper.find('loginButton');
  //     loginBtn.simulate('click')
  //     const text = wrapper.find('email').text();
  //     expect(text).toEqual('email@email.com');
  //   });

});

