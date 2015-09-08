Template.ranking.helpers({
	rankingUser: function () {
		return UserRanking.find({}, {sort: {count: -1}});
	}
});