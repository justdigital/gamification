Template.board.helpers({
	boardCards: function () {
		return Justelecas.find({}, {sort: {when: -1}});
	}
});