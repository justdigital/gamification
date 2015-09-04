Meteor.publish('justelecas', function() {
	return Justelecas.find();
});

Meteor.publish("userNames", function () {
  return Meteor.users.find({}, {fields: {username: 1}});
});