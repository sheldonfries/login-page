jest.mock('meteor/meteor');
import React from 'react';
import App from './App';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

test('Character accepted', () => {
	var c, error, input, result, form, submitted, errorMsg;
	const wrapper = mount(
		<App />
	);
	// Iterate through potential character codes
	for(let i = 0; i < 65535; i++) {
		c = String.fromCharCode(i);
		
		// Find password text input and send character
		input = wrapper.find('#pass');
		input.simulate('change', { target: { value: c } });
		
		wrapper.find('form').simulate('submit', { preventDefault () {} });
		submitted = wrapper.state().submitted;
		errorMsg = wrapper.state().errorMsg;
		console.log("i: " + i + " | Value: " + c + " | Submitted: " + submitted + " | Error: " + errorMsg);
		
		// Check error value and see if it matches expectation
		if((i > 47 && i < 58) || (i > 64 && i < 91) || (i > 96 && i < 123) || i == 126 || i == 33 || i == 64 || i == 35 || i == 36 || i == 37 || i == 94) {
			expect(submitted).toEqual(true);
		}
		else {
			expect(submitted).toEqual(false);
		}
	}
});
