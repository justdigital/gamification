Template.ranking.helpers({
	rankingUser: function () {
		return UserRanking.find({}, {sort: {count: -1}});
	}
});

Template.rankingRow.helpers({
	prize: function () {
		if (this.pos <= 3) {
			if (this.pos == 1) {
				return 'gold';
			} else if (this.pos == 2) {
				return 'silver';
			} else if (this.pos == 3) {
				return 'bronze';
			}
		}
	}
});