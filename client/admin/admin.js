Template.admin.rendered = function() {

	
}

Template.admin.helpers({
	listUsers: function () {

		return Meteor.users.find();
	},
	listJustelecas: function() {
		return Justelecas.find();
	},
	senderName: function () {
		var self = this;
		if (Meteor.users) { 
			var user = Meteor.users.findOne({_id: self.sender});
			return user.profile.fullname;
		}
	},
	recieverName: function () {
		var self = this;
		if (Meteor.users) { 
			var user = Meteor.users.findOne({_id: self.reciever});
			return user.profile.fullname;
		}
	}
});


Template.admin.events({
	'click .isAdmin': function(e, t) {
		var self = this;
		Session.set('modalTitle', 'Administrador');
		Session.set('modalBody', 'Tem certeza que deseja alterar o papel?');
		$('#modal-prompt').openModal({
			ready: function() {
				Session.set('modalOpt', null);
			},
			complete: function() {
				var isVerified = $(e.target).is(":checked");
				if (Session.get('modalOpt')) {
					if (isVerified == true) {
						var profile = {
							role: 1
						}
					} else {
						var profile = {
							role: 0
						}
					}

					Meteor.call('updateRole', profile, self._id, function(err, data) {
						if (err) {
							Materialize.toast('Algum erro ocorreu.', 4000);
							console.log(err);
						} else {
							Materialize.toast('Alterado com sucesso!', 4000);					
						}
					});
				} else {
					$(e.target).prop('checked', !isVerified);
				}
			}
		});		
	},	
	'click .emailVerified': function(e, t) {
		var self = this;
		Session.set('modalTitle', 'Aprovação');
		Session.set('modalBody', 'Tem certeza que deseja mudar o estado de aprovação deste usuário?');
		$('#modal-prompt').openModal({
			ready: function() {
				Session.set('modalOpt', null);
			},
			complete: function() {
				var isVerified = $(e.target).is(":checked");
				if (Session.get('modalOpt')) {
					if (isVerified == true) {
						var profile = {
							verified: true
						}
					} else {
						var profile = {
							verified: false
						}
					}

					Meteor.call('aproveUser', profile, self._id, function(err, data) {
						if (err) {
							Materialize.toast('Algum erro ocorreu.', 4000);
							console.log(err);
						} else {
							Materialize.toast('Alterado com sucesso!', 4000);					
						}
					});
				} else {
					$(e.target).prop('checked', !isVerified);
				}
			}
		});
	},
	'click .removeUser': function(e, t) {
		var self = this;
		Session.set('modalTitle', 'Remover');
		Session.set('modalBody', 'Tem certeza que deseja remover este usuário?');
		$('#modal-prompt').openModal({
			ready: function() {
				Session.set('modalOpt', null);
			},
			complete: function() {
				if (Session.get('modalOpt')) {
					Meteor.call('removeUser', self._id, function(err, data) {
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
	},
	'click .removeCard': function(e, t) {
		var self = this;
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
	},
	'click .isApproved': function(e) {
		var self = this;
		Session.set('modalTitle', 'Justeleca');
		Session.set('modalBody', 'Tem certeza que deseja alterar o status?');
		$('#modal-prompt').openModal({
			ready: function() {
				Session.set('modalOpt', null);
			},
			complete: function() {
				var isVerified = $(e.target).is(":checked");
				if (Session.get('modalOpt')) {
					if (isVerified == true) {
						var justeleca = {
							approved: true
						}
					} else {
						var justeleca = {
							approved: false
						}
					}

					Meteor.call('aproveCard', justeleca, self._id, function(err, data) {
						if (err) {
							Materialize.toast('Algum erro ocorreu.', 4000);
							console.log(err);
						} else {
							Materialize.toast('Alterado com sucesso!', 4000);					
						}
					});
				} else {
					$(e.target).prop('checked', !isVerified);
				}
			}
		});
	}
})