Template.send.rendered = function() {
	$("#send .category").material_select();
	Session.set('autocomplete', []);
}

Template.send.helpers({
	autocompleteUsers: function() {
		return Session.get('autocomplete');
	}
});

Template.send.events({
	'submit #send': function(e) {
		e.preventDefault();
		var name = e.target.name;
		var category = e.target.category;
		var message = e.target.message;
		if (name.value != '' && message.value != '') {
			var justeleca = {
				reciever: name.value,
				sender: Meteor.user().username,
				category: category.value,
				message: message.value,
				when: new Date()
			}
			
			Meteor.call("insert", justeleca, function(err, data) {
				if (err) {
					Materialize.toast(err.message, 4000);
					console.log(err);
				} else {
					Materialize.toast('Inserido com sucesso!', 4000);
				}
			});

			name.value = category.value = message.value = "";
		} else if (sender.value == receiver.value) {
			Materialize.toast('Não é possível enviar para você mesmo.', 4000);
		} else {
			Materialize.toast('Todos os campos são obrigatórios.', 4000);
		}
	},
	'keyup #name': function(e) {
		if (e.target.value.length >= 2) {
			var regex = new RegExp(e.target.value);
			Session.set('autocomplete', Meteor.users.find({username: { $regex: regex }, 'emails.0.verified': true}).fetch());
		} else {
			Session.set('autocomplete', []);
		}
	},
	'click .collection-item': function(e, t) {
		var userName = $(e.target).find(".title").html();
		t.find("#name").value = userName;
		Session.set('autocomplete', []);
	}
})