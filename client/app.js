Template.body.rendered = function() {
	$('.button-collapse').sideNav({
      menuWidth: 240,
      edge: 'left',
      closeOnClick: true
    }
  );
}

Template.menu.helpers({
	isLoggedIn: function() {
		return Meteor.user() != undefined;
	},
	activeNav: function(name) {
		if (name == Session.get('activeNav')) {
			return 'active';
		}
	},
	isAdm: function() {
		if (Meteor.userId()) {
			Meteor.call('isAdmin', function(err, data) {
				if (!err) {
					Session.set('adm', data);
				}
			})
		}
		return Session.get('adm');
	}
})

Template.menu.events({
	'click .logout': function() {
		AccountsTemplates.logout();
		Session.set('activeNav', null);
		Session.set('adm', false);
	}
})