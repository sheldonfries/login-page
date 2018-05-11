import { AccountsServer } from 'meteor/accounts-base';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
    console.log(user);
    return user;
});
