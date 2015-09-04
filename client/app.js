Template.body.rendered = function() {
	$(".button-collapse").sideNav();
}

Template.menu.helpers({
	isLoggedIn: function() {
		return Meteor.user() != undefined;
	}
})

Template.menu.events({
	'click .logout': function() {
		AccountsTemplates.logout();
	}
})