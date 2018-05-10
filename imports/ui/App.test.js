jest.mock('meteor/meteor');
//jest.mock('./LoginTemplate.html', () => 'template');
import React from 'react';
import App from './App';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

import './LoginTemplate.html';

Enzyme.configure({ adapter: new Adapter() });

// Iterate through potential character codes
for(let i = 0; i < 2; i++) {
	const c = String.fromCharCode(i);
	it(i + ': Character accepted: ' + c, () => {
		const wrapper = mount(
			<App />
		);
		
		// Find password text input and send character
		wrapper.find('#password').simulate('change', { target: { id: 'password', value: c } });
		wrapper.find('form').simulate('submit');
		var error = AccountsTemplates.state.form.get("error");
			
		// Check error value and see if it matches expectation
		if((i > 47 && i < 58) || (i > 64 && i < 91) || (i > 96 && i < 123) || i == 126 || i == 33 || i == 64 || i == 35 || i == 36 || i == 37 || i == 94) {
			//expect(wrapper.state().valid).toEqual(true);
			expect(error).not.toMatch(/characters/);
		}
		else {
			//expect(wrapper.state().valid).toEqual(false);
			expect(error).toMatch(/characters/);
		}
	});
}
