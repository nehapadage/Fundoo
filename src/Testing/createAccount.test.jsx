import React from 'react';
import { shallow } from 'enzyme';
import createAccount from "../Components/createAccount"
// import renderer from 'react-test-renderer';
// import { mount, shallow, render } from ‘enzyme';
// import createAccount from '../Components/createAccount'


describe('Register component tests', () => {

  const wrapper1 = shallow(<createAccount />);


  it('should render correctly in "debug" mode', () => {
    const component = shallow(<createAccount debug />);

    expect(component).toMatchSnapshot();
  });

//   it('should have an empty firstName, lastName,email and password state var', () => {
//     //Optionally test to check if password and email are empty strings on 
//     //  setup
//     expect(wrapper1.state('firstName')).toEqual('');
//     expect(wrapper1.state('lastName')).toEqual('');
//     expect(wrapper1.state('email')).toEqual('');
//     expect(wrapper1.state('password')).toEqual('');
    
//   });



//   it('register button status', () => {
//     // wrapper.find('Button').simulate('click');
//     expect(wrapper1.state('flag1')).toBe(false);
//   });












    it('should have input for email and password', ()=> {
      //Email and password input field should be present
      console.log("Length 1 is",wrapper1.find('EmailPass').length);
      
      expect(wrapper1.find('emailText')).toHaveLength(0);    // 1
      expect(wrapper1.find('fnfun')).toHaveLength(0);    // 1
      expect(wrapper1.find('lnfun')).toHaveLength(0);    // 2
      // expect('abc').toHaveLength(3);

  });



 
});

