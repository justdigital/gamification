// Rotas simples.
// Caminho da rota como primeiro parametro e uma função como segundo.

Router.route('/', function() {
	this.render('home');
})