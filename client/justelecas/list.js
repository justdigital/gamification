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
	},
	'click .removeCard': function(e, t) {
		var self = this;
		if (!this.approved) {
			Session.set('modalTitle', 'Remover');
			Session.set('modalBody', 'Tem certeza que deseja remover esta Justeleca?');
			$('#modal-prompt').openModal({
				ready: function() {
					Session.set('modalOpt', null);
				},
				complete: function() {
					if (Session.get('modalOpt')) {
						Meteor.call('removeCard', self._id, function(err, data) {
							if (err) {
								Materialize.toast('Algum erro ocorreu.', 4000);
								console.log(err);
							} else {
								Materialize.toast('Removido com sucesso!', 4000);					
							}
						});
					}
				}
			});
		} else {
			Materialize.toast('Essa Justeleca está aprovada, você não pode deletar!', 4000);
		}
	}
})

Template.card.helpers({
	senderName: function () {
		var self = this;
		if (Meteor.users.findOne()) { 
			var user = Meteor.users.findOne({_id: self.sender});
			return user.profile.fullname;
		}
	},
	recieverName: function () {
		var self = this;
		if (Meteor.users.findOne()) { 
			var user = Meteor.users.findOne({_id: self.reciever});
			return user.profile.fullname;
		}
	},
	color: function() {
		if (this.category == 'pessoal') {
			return 'blue-grey';
		} else {
			return 'grey';
		}
	},
	canDelete: function() {
		if (!this.approved && this.sender == Meteor.userId() && Session.get('activeNav') == 'list') {
			return true;
		} else {
			return false;
		}
	}
});