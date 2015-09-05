Template.home.rendered = function() {
	if (Session.get('denied')) {
		Materialize.toast('Você não tem permissão para enviar Justelecas', 4000);
		Session.set('denied', false);
	}
}