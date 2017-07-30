import Root from '/imports/ui/components/Atoms/Root';
import * as LightboxActionCreators from '/imports/api/redux/actions/lightbox';
import Lightbox from 'react-image-lightbox-universal';
import Panel from './Panel';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ApolloProvider } from 'react-apollo';
import theme from '/imports/ui/variables/theme';
import client from './ApolloClient';

import gql from 'graphql-tag';

import Navigation from '/imports/ui/components/Organisms/Navigation';
import Head from './Head';

export const apolloReducer = client.reducer();
export const apolloMiddleware = client.middleware();

// Clé bleue : 58 1A 50 39
// Carte blanche: 54 FC 6A FF
// Tel bainjamin: 01 02 03 04

const Base = ({ logged, lightbox, lightboxClose, lightboxPrev, lightboxNext }, { store }) => (
  <ApolloProvider store={store} client={client}>
    <Root>
      <Head />
      {logged && lightbox.isOpen ? <Lightbox
        mainSrc={lightbox.list[lightbox.current]}
        nextSrc={lightbox.list[lightbox.next]}
        prevSrc={lightbox.list[lightbox.prev]}

        onCloseRequest={lightboxClose}
        onMovePrevRequest={lightboxPrev}
        onMoveNextRequest={lightboxNext}
        animationOnKeyInput
      />
      :
      null}
      {logged ? <Navigation /> : null}
      <Panel />
    </Root>
  </ApolloProvider>
);

Base.propTypes = {
  logged: PropTypes.func.isRequired,
  lightbox: PropTypes.object.isRequired,
  lightboxClose: PropTypes.func.isRequired,
  lightboxPrev: PropTypes.func.isRequired,
  lightboxNext: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  logged: state.logged,
  lightbox: state.lightbox,
});

const mapDispatchToProps = dispatch => ({
  lightboxClose() {
    dispatch(LightboxActionCreators.lightboxClose());
  },

  lightboxPrev() {
    dispatch(LightboxActionCreators.lightboxPrev());
  },

  lightboxNext() {
    dispatch(LightboxActionCreators.lightboxNext());
  },
});

const BaseWithDeps = connect(mapStateToProps, mapDispatchToProps)(Base);

const BaseWithRouter = withRouter(BaseWithDeps);

Base.contextTypes = {
  store: PropTypes.object.isRequired,
};

const MainApp = () => (
  <ThemeProvider theme={theme}>
    <BaseWithRouter />
  </ThemeProvider>
);

MainApp.ssr = {
  stopTreeWalking: true,
};


export default withRouter(MainApp);
