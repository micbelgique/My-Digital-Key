import querystring from 'querystring';

export const getQueryParams = (location) => (location && location.search) ? querystring.parse(location.search.slice(1)) : null;

export const getParam = (location, param) => {
  const queryParams = getQueryParams(location);
  return queryParams && queryParams[param] ? queryParams[param] : false;
};

export const buildUrl = (pathname, queryObj) => pathname + '?' + querystring.stringify(queryObj);
