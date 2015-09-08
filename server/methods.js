Meteor.methods({
	insert: function(reciever, category, message, timestamp) {
		if (Meteor.user()) {
			if (reciever != Meteor.userId()) {
				if (!Meteor.user().emails[0].verified || 
					!Meteor.users.findOne(reciever).emails[0].verified) {
					throw new Meteor.Error(500, 'Usuário não aprovado.');
				} else {
					var justeleca = {
						reciever: reciever,
						sender: Meteor.userId(),
						category: category,
						message: message,
						when: timestamp
					}
					Justelecas.insert(justeleca, function(err) {
						if (err) {
							throw new Meteor.Error(500, 'Algum erro ocorreu.');
						} else {
							return true;
						}
					});
				}
			} else {
				throw new Meteor.Error(500, 'O destinatário não pode ser você');	
			}
		}
	},
	updateUser: function(obj) { //retrabalhar
		if (Meteor.user()) {
			Meteor.users.update({_id: Meteor.userId()}, {$set: {
				username: obj.username,
				'profile.fullname': obj.fullname,
				'profile.avatar': obj.avatar,
				'emails.0.address': obj.address
			}}, function(err, data) {
				if (err) {
					throw new Meteor.Error(500, 'Algum erro ocorreu.');
				} else {
					return true;
				}
			});
		}
	},
	updateRole: function(obj, userId) {
		if (Meteor.user().role) {
			Meteor.users.update({_id: userId}, {$set: {role: obj.role}}, function(err, data) {
				if (err) {
					throw new Meteor.Error(500, 'Algum erro ocorreu.');
				} else {
					return true;
				}
			});
		}
	},
	aproveUser: function(obj, userId) {
		if (Meteor.user().role) {
			Meteor.users.update({_id: userId}, {$set: {'emails.0.verified': obj.verified}}, function(err, data) {
				if (err) {
					throw new Meteor.Error(500, 'Algum erro ocorreu.');
				} else {
					return true;
				}
			});
		}
	},
	aproveCard: function(obj, id) {
		if (Meteor.user().role) {
			Justelecas.update({_id: id}, {$set: {approved: obj.approved}}, function(err, data) {
				if (err) {
					throw new Meteor.Error(500, 'Algum erro ocorreu.');
				} else {
					return true;
				}
			});
		}
	},
	removeUser: function(userId) {
		if (Meteor.user().role) {
			Meteor.users.remove({_id: userId}, function(err, data) {
				if (err) {
					throw new Meteor.Error(500, 'Algum erro ocorreu.');
				} else {
					return true;
				}			
			})
		}
	},
	removeCard: function(id) {
		if (Meteor.user().role) {
			Justelecas.remove({_id: id}, function(err, data) {
				if (err) {
					throw new Meteor.Error(500, 'Algum erro ocorreu.');
				} else {
					return true;
				}			
			})
		} else {
			throw new Meteor.Error(500, 'Você não tem permissão!');			
		}
	},
	isAdmin: function() {
		if (Meteor.user()) {
			if (Meteor.user().role) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	canSend: function() {
		var user = Meteor.users.findOne({_id: Meteor.userId()});
		if (user.emails[0].verified == true) {
			return true;
		} else {
			return false;
		}
	},
	updateRanking: function() {
		if (Meteor.user().role) {
			var users = Meteor.users.find({'emails.0.verified': true}).fetch();
			users.forEach(function(user, k) {
				var count = Justelecas.find({reciever: user._id, approved: true}).fetch().length;
				var userRanking = {
					userId: user._id,
					fullname: user.profile.fullname,
					avatar: user.profile.avatar || null,
					count: count,
					timestamp: new Date
				}
				if (UserRanking.findOne({userId: user._id})) {
					UserRanking.update({userId: user._id}, {$set: userRanking});
				} else {
					UserRanking.insert(userRanking);
				}
				if (k+1 == users.length) {
					var userSort = [];
					var pos = 0;
					users = UserRanking.find({}, {sort: {count: -1}}).fetch();
					
					users.forEach(function(user) {
						pos++;
						user['pos'] = pos;
						userSort.push(user);
					});

					var lastCompare = 0;
					var finalPosition = 1;

					userSort.forEach(function(user, k) {
						if (userSort[k].count < lastCompare) {
							finalPosition++;
							if (finalPosition <= k) {
								finalPosition = k + 1;
							}
						}
						lastCompare = userSort[k].count;
						UserRanking.update({_id: user._id}, {$set: {pos: finalPosition}});
					});
				}
			});
		} else {
			throw new Meteor.Error(500, 'Usuário não autenticado.');
		}
	},
	checkFirst: function() {
		var count = Meteor.users.find().fetch().length;
		if (count == 1) {
			var user = Meteor.users.findOne();
			if (!user.role) {
				Meteor.users.update({_id: user._id}, {$set: {role: 1}});
				return true;
			}
		}
	}
})