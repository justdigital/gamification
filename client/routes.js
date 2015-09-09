// Rotas simples.
// Caminho da rota como primeiro parametro e uma função como segundo.

Router.route('/', {
	seo: {
		title: 'Home'
	},
	action: function() {
		Session.set('activeNav', null);
		this.render('home');
	}
});

Router.route('/send', {
	seo: {
		title: 'Enviar Justelecas'
	},
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
	seo: {
		title: 'Minhas Justelecas'
	},
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
	seo: {
		title: 'Mural'
	},
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
	seo: {
		title: 'Resultado Atual'
	},
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
	seo: {
		title: 'Configuração'
	},
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
	seo: {
		title: 'Painel Administrativo'
	},
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

Router.plugin('seo', {
  defaults: {
  	title: 'Bem vindo ao',
  	suffix: 'Gamification',
  	separator: '-'
  }
});

Router.configure({
  loadingTemplate: 'loading'
});

Router.onBeforeAction('loading');