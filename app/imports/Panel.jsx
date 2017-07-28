import React, { Component } from 'react';
import Login from '/imports/ui/components/Pages/Login';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { valueSet } from 'meteor/ssrwpo:ssr';
import client from '/imports/ApolloClient';
import Dashboard from '/imports/ui/components/Pages/Dashboard';
import NFC from '/imports/ui/components/Pages/NFC';

class Panel extends Component {

  componentWillMount() {
    if (Meteor.isClient && Meteor.userId()) this.props.setLoggedIn();
  }

  componentDidMount() {
    const { setLoggedIn, setLoggedOut } = this.props;
    Tracker.autorun(() => {
      const userId = Meteor.userId();
      if (userId) {
        setLoggedIn();
      } else {
        setLoggedOut();
      }
      client.resetStore();
    });
  }

  render() {
    if (!this.props.logged) return <Login />;
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/NFC" component={NFC} />
        <Route
          exact
          path="/disconnect"
          render={() => {
            Meteor.logout();
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
