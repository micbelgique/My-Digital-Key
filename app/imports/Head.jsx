import React from 'react';
import Helmet from 'react-helmet';

const Head = () => (
  <Helmet>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <meta charSet="utf-8" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
    <meta name="theme-color" content="#ffffff" />
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
    <link rel="manifest" href="/favicons/manifest.json" />
    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#282d2e" />
    <link rel="shortcut icon" href="/favicons/favicon.ico" />
  </Helmet>
);

export default Head;
