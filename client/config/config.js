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

			var update = function() {
				Meteor.call('updateUser', profile, Meteor.userId(), function(err, data) {
					if (err) {
						Materialize.toast('Algum erro ocorreu.', 4000);
						console.log(err);
					} else {
						Materialize.toast('Alterado com sucesso!', 4000);					
					}
				})
			}

			var profile = {
				username: username,
				fullname: fullname,
				address: email,
				avatar: null
			}

			var files = e.target.files.files;

			if (files.length > 0) {
				for (var i = 0, ln = files.length; i < ln; i++) {
					Avatars.insert(files[i], function (err, fileObj) {
						if (err) {
							Materialize.toast('Erro ao enviar Imagem.', 4000);
						}
						profile.avatar = fileObj._id;
						update();
					});
				}
			} else {
				update();
			}


		}
	},
	// 'change .file': function(e, t) {
	// 	FS.Utility.eachFile(event, function(file) {
	// 		Avatars.insert(file, function (err, fileObj) {
	// 			console.log(err, fileObj);	
	// 		});
	// 	});
	// }
})