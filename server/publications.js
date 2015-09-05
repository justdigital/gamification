Meteor.publish('justelecas', function() {
	return Justelecas.find();
});

Meteor.publish("userNames", function () {
  return Meteor.users.find({}, {fields: {profile: 1}});
});

Meteor.publish("userInfo", function () {
  return Meteor.users.find({}, {fields: {profile: 1, emails: 1}});
});

Meteor.publish("fullUser", function () {
  return Meteor.users.find({}, {fields: {services: 0}});
});