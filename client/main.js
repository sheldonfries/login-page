import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Accounts } from 'meteor/accounts-base';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.js';

Meteor.startup(() => {
	var logout = document.getElementById('logout');
	logout.onclick = Meteor.logout();
	render(<App />, document.getElementById('root'));
});
