import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Accounts } from 'meteor/accounts-base';

import App from '../imports/ui/App.js';
 
Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
});
