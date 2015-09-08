// Rotas simples.
// Caminho da rota como primeiro parametro e uma função como segundo.

Router.route('/', function() {
	Session.set('activeNav', null);
	this.render('home');
});

Router.route('/login', function() {
	this.render('login');
});

Router.route('/send', {
	onBeforeAction: function() {
		if (this.ready()) {
			Session.set('activeNav', 'send');
			this.subscribe('justelecas');
			this.next();
		}
	},
	waitOn: function() {
		return this.subscribe('userInfo', {emails: 1, profile: 1});
	},
	action: function() {
		if (this.ready()) {
			var self = this;
			Meteor.call('canSend', function(err, data) {
				if (data) {
					self.render('send');
				} else {
					self.render('home');
					Session.set('denied', true);
				}
			});
		}
	}
});

Router.route('/list', {
	onBeforeAction: function() {
		if (this.ready()) {
			Session.set('activeNav', 'list');
			this.subscribe('justelecas');
			this.next();
		}
	},
	waitOn: function() {
		return this.subscribe('userInfo', {profile: 1});
	},
	action: function() {
		if (this.ready) {
			this.render('list');
		}
	}
});

Router.route('/board', {
	onBeforeAction: function() {
		if (this.ready()) {
			Session.set('activeNav', 'board');
			this.subscribe('justelecas');
			this.next();
		}
	},
	waitOn: function() {
		return this.subscribe('userInfo', {profile: 1});
	},
	action: function() {
		if (this.ready) {
			this.render('board');
		}
	}
});

Router.route('/ranking', {
	onBeforeAction: function() {
		if (this.ready()) {
			Session.set('activeNav', 'ranking');
			this.subscribe('userranking');
			this.next();
		}
	},
	waitOn: function() {
		return this.subscribe('userInfo', {profile: 1});
	},
	action: function() {
		if (this.ready) {
			this.render('ranking');
		}
	}
});

Router.route('/config', {
	onBeforeAction: function() {
		if (this.ready()) {
			Session.set('activeNav', 'config');
			this.subscribe('avatars');
			this.next();
		}
	},
	data: function() {
		return Meteor.user();
	},
	action: function() {
		if (this.ready) {
			this.render('config');
		}
	}
});

Router.route('/admin', {
	onBeforeAction: function() {
		if (this.ready()) {
			Session.set('activeNav', 'admin');
			this.subscribe('justelecas');
			this.next();
		}
	},
	waitOn: function() {
		return this.subscribe('userInfo', {});
	},
	action: function() {
		if (this.ready()) {
			var self = this;
			Meteor.call('isAdmin', function(err, data) {
				if (data) {
					if (self.ready) self.render('admin');
				} else {
					if (self.ready) self.render('home');
					Session.set('denied', true);
				}
			});	
		}
	} 
});


Router.plugin('ensureSignedIn');

Router.configure({
  loadingTemplate: 'loading'
});

Router.onBeforeAction('loading');