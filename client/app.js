Template.body.rendered = function() {
	$('.button-collapse').sideNav({
      menuWidth: 240,
      edge: 'left',
      closeOnClick: true
    }
  );

  var egg = new Egg();
  var eggWraper = $(".easterEgg");
  egg
  	.addCode("s,i,m", function(){
  		eggWraper.css({
  			right: 0
  		});
  		setTimeout(function() {
  			eggWraper.css({
	  			right: '-425px'
	  		});
  		}, 500);
  	})
  	.listen();
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
