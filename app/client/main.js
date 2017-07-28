import '/imports/startup/client';
import { createRouter, logger, getStore } from 'meteor/ssrwpo:ssr';
import appReducers from '/imports/api/redux/reducers';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import MainApp, { apolloReducer, apolloMiddleware } from '/imports/MainApp';

const appMiddlewares = [
  thunk,
  apolloMiddleware,
];

const storeEnhancers = composeWithDevTools(
  applyMiddleware(...appMiddlewares),
);

logger.info('Starting router');
createRouter({
  MainApp,
  appReducers: { ...appReducers, apollo: apolloReducer },
  storeEnhancers,
  hasUrlStore: false,
})
.then(() => {
  // For easing debug
  if (Meteor.settings.public.mode === 'dev') window.store = getStore();
});
