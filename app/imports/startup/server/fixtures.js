Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'Corentin',
      email: 'corentin@mighdy.com',
      password: 'superadmin',
    });
  }
});
