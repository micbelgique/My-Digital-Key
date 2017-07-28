const scrollTopIfClient = () => {
  if (Meteor.isClient) {
    window.scrollTo(0,0);
  } else {
    return null;
  }
}

export default scrollTopIfClient;
