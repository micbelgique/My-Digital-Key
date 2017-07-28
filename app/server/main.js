import { createRouter, resetSSRCache, logger } from 'meteor/ssrwpo:ssr';
import '/imports/startup/server';
import MainApp from '/imports/MainApp';
import { serverReducers as reducers } from '/imports/api/redux/reducers';
import routes from './routes';

import robotsTxt from './robotsTxt';
import humansTxt from './humansTxt';
import sitemapXml from './sitemapXml';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { apolloReducer, apolloMiddleware } from '/imports/MainApp';

logger.info('Starting router');

const appMiddlewares = [
  thunk,
  apolloMiddleware,
];

const storeEnhancers = applyMiddleware(...appMiddlewares);

createRouter(MainApp, {
  robotsTxt,
  humansTxt,
  sitemapXml,
  routes,
}, {
  appReducers: {
    ...reducers,
    apollo: apolloReducer,
  },
  storeEnhancers,
});

const globalCollections = [];
globalCollections.forEach((collection) => {
  let initializing = true;
  collection.find().observeChanges({
    added: () => { if (!initializing) resetSSRCache(); },
    changed: () => resetSSRCache(),
    removed: () => resetSSRCache(),
  });
  initializing = false;
});
resetSSRCache();

logger.info('Router started');
