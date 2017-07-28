import { Meteor } from 'meteor/meteor';
import sm from 'sitemap';

const sitemap = sm.createSitemap({
  hostname: Meteor.absoluteUrl(),
  cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  urls: [],
});

let dynamicRoutes = null;

const sitemapXml = () => {
  if (dynamicRoutes) dynamicRoutes.forEach(r => sitemap.del(r.url));
  dynamicRoutes = [];
  // Add dynamic routes
  dynamicRoutes.forEach(r => sitemap.add(r));
  return sitemap.toString();
};

export default sitemapXml;
