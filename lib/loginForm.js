var pwd = AccountsTemplates.removeField('password');

AccountsTemplates.addFields([
	{
		_id: "username",
		type: "text",
		displayName: "username",
		required: true,
		minLength: 5,
	},
	pwd
]);



 AccountsTemplates.configure({
	showForgotPasswordLink: true,
	enablePasswordChange: true,
	showPlaceholders: false,
});
