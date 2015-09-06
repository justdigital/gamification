/*
	Use a publication abaixo como exemplo de publication
*/

Meteor.publish("userInfo", function (fields) {

	/*
		"Meteor.user()" não pode ser acessado em publications.
		Devemos usar "this.userId" para acessar as informações do usuario.
	*/
	if (!Meteor.users.findOne(this.userId).role) {

		/*
			Remove o campo role da query por segunrança.
		*/
		delete fields.role;

		/*
			Remove o campo services da query por segunrança.
		*/
		delete fields.services;

		/*
			Checa se o objeto esta vazio, para evitar o retorno de todos os dados da collection.
		*/
		if (Object.keys(fields).length === 0) {

			/* 
				Retorna o metodo ready para que o cliente não fique em looping eterno.
			*/
			return this.ready();
		}
	}

	/*
		Retorna dos campos especificanos no parametro "fields".
		Podemos retornar mais de uma collection, basta retornar um array de com as collections.
	*/
  return [
  	Meteor.users.find({}, {fields: fields}),
  	Avatars.find()
  ]
});

/*  --  */

Meteor.publish("justelecas", function() {
	return Justelecas.find();
});

Meteor.publish("avatars", function() {
	return Avatars.find();
});