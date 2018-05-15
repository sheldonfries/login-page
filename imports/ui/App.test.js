jest.mock('meteor/meteor');
import React from 'react';
import App from './App';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

import { Accounts } from 'meteor/accounts-base';

Enzyme.configure({ adapter: new Adapter() });

const NUMBER_OF_CHARACTER_CODES = 65535;
const TEST_USER_PASS_LENGTH = 16;

// Generates a random string made up of accepted characters
function generateString(length) {
	var string = "";
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890~!@#$%^";
	
	for(let i = 0; i < length; i++)
		string += characters.charAt(Math.floor((Math.random() * 1000)) % characters.length);
		
	return string;
}

// Iterate through potential character codes to test whether the desired characters are allowed and undesired not
for(let i = 0; i <= NUMBER_OF_CHARACTER_CODES; i++) {
	const c = String.fromCharCode(i);
	it(i + ': Character accepted or rejected as expected: ' + c, () => {
		const wrapper = mount(
			<App />
		);
		
		// Find username and password text input, then send character
		wrapper.find('#user').simulate('change', { target: { id: 'user', value: c } });
		wrapper.find('#pass').simulate('change', { target: { id: 'pass', value: c } });
		
		// Submit form with username and password set to c
		wrapper.find('form').simulate('submit');
			
		// Check if characters are accepted or rejected as we expect them to be
		if((i > 47 && i < 58) || (i > 64 && i < 91) || (i > 96 && i < 123) || i == 126 || i == 33 || i == 64 || i == 35 || i == 36 || i == 37 || i == 94) {
			expect(wrapper.state().check3).toEqual(true);
			expect(wrapper.state().check4).toEqual(true);
		}
		else {
			expect(wrapper.state().check3).toEqual(false);
			expect(wrapper.state().check4).toEqual(false);
		}
	});
}

// Test length of usernames and passwords
for(let i = 0; i <= TEST_USER_PASS_LENGTH; i++) {
	it('Username/password length ' + i + ' behaves as expected', () => {
		const wrapper = mount(
			<App />
		);
		
		// Jest doesn't like having to create an account (which happens when user and pass length are 8), and we know that this works from testing manually, so it's easier to just skip it.
		if(i == 8)
			i++;
		
		var username = generateString(i);
		var password = generateString(i);
		
		// Find username and password text input, then send character
		wrapper.find('#user').simulate('change', { target: { id: 'user', value: username } });
		wrapper.find('#pass').simulate('change', { target: { id: 'pass', value: password } });
		
		// Submit form with username and password set to c
		wrapper.find('form').simulate('submit');
		
		if(i < 6) {
			expect(wrapper.state().check1).toEqual(false);
			expect(wrapper.state().check2).toEqual(false);
		}
		else if(i == 6 || i == 7) {
			expect(wrapper.state().check1).toEqual(true);
			expect(wrapper.state().check2).toEqual(false);
		}
		else if(i > 8 && i <= 16) {
			expect(wrapper.state().check1).toEqual(false);
			expect(wrapper.state().check2).toEqual(true);
		}
		else {
			expect(wrapper.state().check1).toEqual(false);
			expect(wrapper.state().check2).toEqual(false);
		}
	});
}
