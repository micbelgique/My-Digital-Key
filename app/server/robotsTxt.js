import { Meteor } from 'meteor/meteor';

const robotsTxt = () =>
`User-agent: *
Sitemap: ${Meteor.absoluteUrl()}sitemap.xml`;

export default robotsTxt;
