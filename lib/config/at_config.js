AccountsTemplates.removeField('email');                           
AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true,
    minLength: 6,
    maxLength: 8,
    re: /^[a-zA-Z0-9~!@#$%^]+$/,
    errStr: 'Length must be 6-8 and can only contain alpha numeric values or these special characters: ~, !, @, #, $, %, ^',
});

AccountsTemplates.removeField('password');                           
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 8,
    maxLength: 16,
    re: /^[a-zA-Z0-9~!@#$%^]+$/,
    errStr: 'Length must be 8-16 and can only contain alpha numeric values or these special characters: ~, !, @, #, $, %, ^',
});

AccountsTemplates.configure({
	continuousValidation: true,
	forbidClientAccountCreation: false
});
