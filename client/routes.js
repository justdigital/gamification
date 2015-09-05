// Rotas simples.
// Caminho da rota como primeiro parametro e uma função como segundo.

Router.route('/', function() {
	Session.set('usersReady', false);
	this.render('home');
});

Router.route('/login', function() {
	Session.set('usersReady', false);
	this.render('login');
});

Router.route('/send', {
	onBeforeAction: function() {
		Session.set('usersReady', false);
		Session.set('activeNav', 'send');
		this.subscribe('justelecas');
		this.subscribe('userInfo');
		this.subscribe('avatars');
		this.next();
	},
	action: function() {
		var self = this;
		Meteor.call('canSend', Meteor.userId(), function(err, data) {
			if (data) {
				self.render('send');
			} else {
				self.render('home');
				Session.set('denied', true);
			}
		})
	}
});

Router.route('/list', {
	onBeforeAction: function() {
		Session.set('activeNav', 'list');
		this.subscribe('justelecas');
		this.subscribe('userNames', function() {
			Session.set('usersReady', true);
		});
		this.next();
	},
	action: function() {
		this.render('list');
	}
});

Router.route('/board', {
	onBeforeAction: function() {
		Session.set('activeNav', 'board');
		this.subscribe('justelecas');
		this.subscribe('userNames', function() {
			Session.set('usersReady', true);
		});
		this.next();
	},
	action: function() {
		this.render('board');
	}
});

Router.route('/config', {
	onBeforeAction: function() {
		Session.set('activeNav', 'config');
		Session.set('usersReady', false);
		this.subscribe('avatars');
		this.next();
	},
	action: function() {
		this.render('config', {
			data: {
				user: Meteor.user()
			}
		});
	}
});

Router.route('/admin', {
	onBeforeAction: function() {
		Session.set('usersReady', false);
		Session.set('activeNav', 'admin');
		this.subscribe('fullUser');
		this.subscribe('justelecas');
		this.next();
	},
	action: function() {
		this.render('admin');
	}
});

Router.plugin('ensureSignedIn');