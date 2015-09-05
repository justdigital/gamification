Session.setDefault('tab', 'sent');
Template.list.rendered = function() {
	$('ul.tabs').tabs();
}

Template.list.helpers({
	active: function(tab) {
		if (Session.get('tab') == tab) return 'active';
	},
	tabSent: function() {
		if (Session.get('tab') == 'sent') {
			return true;
		} else {
			return false;
		}

	},
	cardsSent: function() {
		if (Meteor.user()) {
			return Justelecas.find({sender: Meteor.userId()});
		}
	},
	cardsRecieved: function() {
		if (Meteor.user()) {
			return Justelecas.find({reciever: Meteor.userId()});
		}
	},
	counter: function(type) {
		if (Meteor.user()) {
			if (type == "sent") {
				return Justelecas.find({sender: Meteor.userId()}).fetch().length;
			} else {
				return Justelecas.find({reciever: Meteor.userId()}).fetch().length;
			}
		}
	}
})

Template.list.events({
	'click #sent': function() {
		Session.set('tab', 'sent');
	},
	'click #recieved': function() {
		Session.set('tab', 'recieved');
	}
})

Template.card.helpers({
	senderName: function () {
		var self = this;
		if (Session.get('usersReady')) { 
			var user = Meteor.users.findOne({_id: self.sender});
			return user.profile.fullname;
		}
	},
	recieverName: function () {
		var self = this;
		if (Meteor.users.findOne()) {
			if (Session.get('usersReady')) { 
				var user = Meteor.users.findOne({_id: self.reciever});
				return user.profile.fullname;
			}
		}
	}
});