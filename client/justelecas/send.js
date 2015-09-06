Template.send.rendered = function() {
	$("#send .category").material_select();
	Session.set('autocomplete', []);
	Session.set('clicked', null);
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
		var timestamp = new Date();
		if (name.value != '' && message.value != '' && Session.get('clicked') != null) {
			Meteor.call("insert", Session.get('clicked'), category.value, message.value, timestamp, function(err, data) {
				if (err) {
					Materialize.toast(err.message, 4000);
					console.log(err);
				} else {
					Materialize.toast('Inserido com sucesso!', 4000);
				}
			});
			name.value = category.value = message.value = "";
			Session.set('username', false)
		} else if (Meteor.user().username == Session.get("username")) {
			Materialize.toast('Não é possível enviar para você mesmo.', 4000);
		} else {
			Materialize.toast('Todos os campos são obrigatórios.', 4000);
		}
	},
	'keyup #name': function(e) {
		if (e.target.value.length >= 2) {
			var regex = new RegExp(e.target.value, 'gi');
			Session.set('autocomplete', Meteor.users.find({'profile.fullname': { $regex: regex }, 'emails.0.verified': true}).fetch());
		} else {
			Session.set('autocomplete', []);
		}
	}
});

Template.autocompleteUser.helpers({
	avatar: function () {
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
		Session.set('clicked', this._id);
		Session.set('autocomplete', []);
	}	
})