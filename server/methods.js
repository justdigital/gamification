Meteor.methods({
	insert: function(obj) {
		Justelecas.insert(obj, function(err) {
			if (err) {
				throw new Meteor.Error( 500,'Algum erro ocorreu.');
			} else {
				return 'Inserido com sucesso!';
			}
		});
	}
})