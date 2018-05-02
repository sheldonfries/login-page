import { AccountsServer } from 'meteor/accounts-base';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => { 
    if(user.username) {
        if(user.username.length < 6 || user.username.length > 8) {
            throw new Meteor.Error(403, 'Username must have 6-8 characters.');
        }
        /*if(user.services.password.length < 8 || user.services.password.length > 16) {
            throw new Meteor.Error(403, 'Password must have 8-16 characters.');
        }*/
        if(!user.username.match("^[a-zA-Z0-9~!@#$%^]+$")) {
            throw new Meteor.Error(403, 'Username should only include alpha numeric values or these special characters: ~, !, @, #, $, %, ^');   
        }
        /*if(!user.services.password.match("^[a-zA-Z0-9~!@#$%^]+$")) {
            throw new Meteor.Error(403, 'Password should only include alpha numeric values or these special characters: ~, !, @, #, $, %, ^');   
        }*/

        /*
        if(user != "demo1234" || pass != "demo~!@#$%^1234") {
            msgSpan.textContent = msgSpan.textContent + ' Invalid username and/or password.';
        } */
        return true;
    }
    return false;
});

Accounts.onCreateUser(function(options, user) {
    console.log(user);
    return user;
});

AccountsTemplates.removeField('password');                           
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    placeholder: {
        signUp: "Minimum 8 characters length."
    },
    required: true,
    minLength: 8,
    re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
    errStr: 'Minimum 1 digit, 1 smallcaps letter en 1 caps letter.',
});
