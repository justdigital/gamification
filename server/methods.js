Meteor.methods({
	insert: function(obj) {
		if (obj.reciever != obj.sender) { 
			obj.reciever = Meteor.users.findOne({username: obj.reciever})._id;
			obj.sender = Meteor.users.findOne({username: obj.sender})._id;
			if (!Meteor.users.findOne({_id: obj.sender}).emails[0].verified || 
				!Meteor.users.findOne({_id: obj.reciever}).emails[0].verified) {
				throw new Meteor.Error(500, 'Usuário não aprovado.');
				return false;
			}
			Justelecas.insert(obj, function(err) {
				if (err) {
					throw new Meteor.Error(500, 'Algum erro ocorreu.');
				} else {
					return true;
				}
			});
		} else {
			throw new Meteor.Error(500, 'O destinatário não pode ser você');
		}
	},
	updateUser: function(obj, userId) {
		Meteor.users.update({_id: userId}, {$set: {
			username: obj.username,
			'profile.fullname': obj.fullname,
			'profile.avatar': obj.avatar,
			'emails.0.address': obj.address
		}}, function(err, data) {
			console.log(err, data);
			if (err) {
				throw new Meteor.Error(500, 'Algum erro ocorreu.');
			} else {
				return true;
			}
		});
	},
	updateRole: function(obj, userId) {
		Meteor.users.update({_id: userId}, {$set: {role: obj.role}}, function(err, data) {
			console.log(err, data);
			if (err) {
				throw new Meteor.Error(500, 'Algum erro ocorreu.');
			} else {
				return true;
			}
		});
	},
	aproveUser: function(obj, userId) {
		Meteor.users.update({_id: userId}, {$set: {'emails.0.verified': obj.verified}}, function(err, data) {
			console.log(err, data);
			if (err) {
				throw new Meteor.Error(500, 'Algum erro ocorreu.');
			} else {
				return true;
			}
		});
	},
	aproveCard: function(obj, id) {
		Justelecas.update({_id: id}, {$set: {approved: obj.approved}}, function(err, data) {
			console.log(err, data);
			if (err) {
				throw new Meteor.Error(500, 'Algum erro ocorreu.');
			} else {
				return true;
			}
		});
	},
	removeUser: function(userId) {
		Meteor.users.remove({_id: userId}, function(err, data) {
			console.log(err, data);
			if (err) {
				throw new Meteor.Error(500, 'Algum erro ocorreu.');
			} else {
				return true;
			}			
		})
	},
	removeCard: function(id) {
		Justelecas.remove({_id: id}, function(err, data) {
			console.log(err, data);
			if (err) {
				throw new Meteor.Error(500, 'Algum erro ocorreu.');
			} else {
				return true;
			}			
		})
	},
	isAdmin: function(userId) {
		var user = Meteor.users.findOne({_id: userId});
		if (user.role == 1) {
			return true;
		} else {
			return false;
		}
	},
	canSend: function(userId) {
		var user = Meteor.users.findOne({_id: userId});
		if (user.emails[0].verified == true) {
			return true;
		} else {
			return false;
		}
	}
})