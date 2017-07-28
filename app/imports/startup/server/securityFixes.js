import { Meteor } from 'meteor/meteor';

Accounts.config({
  forbidClientAccountCreation: true,
});

Meteor.startup(() => {
  Meteor.users.deny({
    update() {
      return true;
    },
  });
});
