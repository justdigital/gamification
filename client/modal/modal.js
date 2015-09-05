Session.setDefault('modalTitle', 'Modal');
Session.setDefault('modalBody', 'Modal body');

Template.modal.helpers({
	modalTitle: function() {
		return Session.get('modalTitle');
	},
	modalBody: function() {
		return Session.get('modalBody');
	}
})

Template.modal.events({
	'click #modalConfirm': function(e) {
		Session.set('modalOpt', true);
	},
	'click #modalDecline': function(e) {
		Session.set('modalOpt', false);
	}
})