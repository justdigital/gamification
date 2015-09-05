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
				reciever: Session.get("username"),
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
		} else if (Meteor.user().username == Session.get("username")) {
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
	}
});

Template.autocompleteUser.helpers({
	avatar: function () {
		console.log(this);
		if (this.profile.avatar) {
			var avatar = Avatars.findOne(this.profile.avatar);
			return avatar.url();
		} else {
			return 'images/avatar.png';			
		}
	}
});

Template.autocompleteUser.events({
	'click .collection-item': function(e, t) {
		$("#name").val(this.profile.fullname);
		Session.set('username', this.username);
		Session.set('autocomplete', []);
	}	
})