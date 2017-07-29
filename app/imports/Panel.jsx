import React, { Component } from 'react';
import Login from '/imports/ui/components/Pages/Login';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { valueSet } from 'meteor/ssrwpo:ssr';
import client from '/imports/ApolloClient';
import { onTokenChange, userId, logout } from 'meteor-apollo-accounts';
import Dashboard from '/imports/ui/components/Pages/Dashboard';
import NFC from '/imports/ui/components/Pages/NFC';
import Locks from '/imports/ui/components/Pages/Locks';
import Keys from '/imports/ui/components/Pages/Keys';

class Panel extends Component {

  componentWillMount() {
    if (Meteor.isClient) {
      userId()
      .then(() => {
        this.props.setLoggedIn();
      });
    }
  }

  componentDidMount() {
    const { setLoggedIn, setLoggedOut } = this.props;
    onTokenChange(() => {
      userId()
      .then((data) => {
        setLoggedIn();
      })
      .catch(() => {
        setLoggedOut();
      });
      client.resetStore();
    });
  }

  render() {
    if (!this.props.logged) return <Login />;
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/NFC" component={NFC} />
        <Route exact path="/locks" component={Locks} />
        <Route exact path="/keys" component={Keys} />
        <Route
          exact
          path="/disconnect"
          render={() => {
            logout(client);
            return <Redirect to="/" />;
          }}
        />
      </Switch>
    );
  }
}

Panel.propTypes = {
  logged: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  setLoggedOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  logged: state.logged,
});

const mapDispatchToProps = dispatch => ({
  setLoggedIn() {
    dispatch(valueSet('logged', true));
  },
  setLoggedOut() {
    dispatch(valueSet('logged', false));
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Panel));
