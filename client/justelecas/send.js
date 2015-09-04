users = [];

Template.send.rendered = function() {
	$("#send .category").material_select();
}

Template.send.helpers({
	autocompleteUsers: function() {
		if (users[0]) {
			return users;
		}
	}
});

Template.send.events({
	'submit #send': function(e) {
		e.preventDefault();
		var name = e.target.name;
		var category = e.target.category;
		var message = e.target.message;
		if (name.value != '' && message.value != '') {
			Materialize.toast('Inserindo...', 4000);

			var justeleca = {
				reciever: name.value,
				sender: Meteor.user().username,
				category: category.value,
				message: message.value,
				when: new Date()
			}
			
			Meteor.call("insert", justeleca, function(err, data) {
				if (err) {
					Materialize.toast("Algum erro ocorreu.", 4000);
					console.log(err);
				} else {
					Materialize.toast('Inserido com sucesso!', 4000);
				}
			});

			name.value = category.value = message.value = "";
		} else {
			Materialize.toast('Todos os campos são obrigatórios.', 4000);
		}
	},
	'keyup #name': function(e) {
		if (e.target.value.length >= 2) {
			var regex = new RegExp(e.target.value);
			users = Meteor.users.find({username: { $regex: regex }}).fetch();
		}
	}
})