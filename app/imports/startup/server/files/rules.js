import myFiles from '/imports/api/files';

Meteor.startup(() => {
  myFiles.allow({
    insert: () => false,
    remove: () => false,
    read: (userId, file) => {
      const metadata = file.metadata !== null ? file.metadata : false; // We are
      const isPublic = (metadata &&
        metadata.isPublic !== null &&
        metadata.isPublic === true
      ); // checking if the file is public
      if (isPublic) return true; // If it is then allow access
      // Else we check if the filed is owned by someone
      const owned = file.metadata && file.metadata._auth && file.metadata._auth.owner;
      // If owned, check if owned by current user
      // deny access if it's owned but not by the current user
      if (owned && userId !== file.metadata._auth.owner) return false;
      return true; // Allow access if it is not owned, or owned by the current user
    },
    write: () => false,
  });
});
