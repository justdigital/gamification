// Rotas simples.
// Caminho da rota como primeiro parametro e uma função como segundo.

Router.route('/', function() {
	this.render('home');
});

Router.route('/login', function() {
	this.render('login');
});

Router.route('/send', {
	onBeforeAction: function() {
		this.subscribe('justelecas');
		this.subscribe('userNames');
		this.next();
	},
	action: function() {
		this.render('send');
	}
});

Router.route('/list', {
	onBeforeAction: function() {
		//subscribe na collection de justelacas
		this.next();
	},
	action: function() {
		this.render('list');
	}
});