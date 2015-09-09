var pwd = AccountsTemplates.removeField('password');

Accounts.onLogin(function() {
  var userCount = Meteor.call("checkFirst");
});

AccountsTemplates.addFields([
	{
		_id: "username",
		type: "text",
		displayName: "Usuário",
		required: true,
		minLength: 5,
	},
	{
		_id: "fullname",
		type: "text",
		displayName: "Nome Completo",
		required: true,
		minLength: 5,

	},
	pwd
]);

AccountsTemplates.configure({
	showForgotPasswordLink: true,
	enablePasswordChange: true,
	showPlaceholders: false,
	texts: {
        signInLink_pre: "Já possui uma conta?",
        signInLink_link: "Login",
        signInLink_suff: "",
        signUpLink_pre: "Ainda não tem conta?",
        signUpLink_link: "Cadastre-se",
        resendVerificationEmailLink_pre: "Não recebeu?",
        resendVerificationEmailLink_link: "Enviar novamente.",
        resendVerificationEmailLink_suff: "",
        pwdLink_link: "Esqueceu a senha?",
        sep: "OU",
        title: {
	        changePwd: "Senha",
	        forgotPwd: "Esqueceu a senha",
	        resetPwd: "Resetar a senha",
	        signIn: "Login",
	        signUp: "Cadastro",
	        verifyEmail: "Verifique o email",
      	},
      	button: {
          changePwd: "Mudar senha",
          forgotPwd: "Esqueci minha senha",
          resetPwd: "Resetar minha senha",
          signIn: "Logar-se",
          signUp: "Cadastre-se",
        },
        info: {
            emailSent: "Email enviado!",
            emailVerified: "Email verificado!",
            pwdChanged: "Senha atualizada!",
            pwdReset: "Senha atualizada!",
            pwdSet: "Senha atualizada!",
            signUpVerifyEmail: "Registrado com sucesso!",
            verificationEmailSent: "Você recebeu um email com os seus dados.",
        },
        errors: {
            loginForbidden: "Usuario e/ou senha não conferem",
            mustBeLoggedIn: "Você precisa estar logado",
            pwdMismatch: "As senhas não conferem",
            verifyEmailFirst: "Verifique seu email!",
        }
    }
});

