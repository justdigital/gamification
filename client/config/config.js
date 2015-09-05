Template.config.rendered = function() {

}

Template.config.events({
	'submit #editUser': function(e) {
		e.preventDefault();
		var username = e.target.username.value,
			fullname = e.target.fullname.value,
			email = e.target.email.value;
		if (username.length < 5) username = '';
		if (fullname.length < 5) fullname = '';
		if (email.length < 10) email = '';


		if (username != '' && fullname != '' && email != '') {
			var profile = {
				username: username,
				fullname: fullname,
				address: email
			}

			Meteor.call('updateUser', profile, Meteor.userId(), function(err, data) {
				if (err) {
					Materialize.toast('Algum erro ocorreu.', 4000);
					console.log(err);
				} else {
					Materialize.toast('Alterado com sucesso!', 4000);					
				}
			})
		}
	},
})