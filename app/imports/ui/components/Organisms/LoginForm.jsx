import React from 'react';
import LoginWrapper from '/imports/ui/components/Atoms/LoginWrapper';
import LoginLogo from '/imports/ui/components/Atoms/LoginLogo';
import { Field, reduxForm } from 'redux-form';
import FormLine from '/imports/ui/components/Atoms/FormLine';
import StyledForm from '/imports/ui/components/Atoms/LoginForm';
import LoginText from '/imports/ui/components/Molecules/LoginText';
import Button from '/imports/ui/components/Atoms/Button';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { valueSet } from 'meteor/ssrwpo:ssr';
import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';

const SubmitLine = styled(FormLine)`
  margin: 15px 0 0 0;
`;

const login = async ({ email, password }, animateError) => {
  try {
    await Meteor.loginWithPassword(email, password, (err) => {
      if (err) animateError();
    });
  } catch (error) {
    animateError();
  }
};

const FormBase = ({ handleSubmit, animateError, animateErrorStatus, noJS }) => (
  <StyledForm animateError={animateErrorStatus} method="post" onSubmit={handleSubmit(res => login(res, animateError))}>
    <FormLine>
      <Field name="email" placeholder="Identifiant / e-mail" component={LoginText} />
    </FormLine>
    <FormLine>
      <Field name="password" type="password" placeholder="Mot de passe" component={LoginText} />
    </FormLine>
    <SubmitLine>
      <Button disabled={noJS} full background="pos">Se connecter</Button>
    </SubmitLine>
  </StyledForm>
);

const mapStateToProps = state => ({
  logging: state.logging,
  animateErrorStatus: state.loginFormError,
});

const mapDispatchToProps = dispatch => ({
  animateError: throttle(() => {
    dispatch(valueSet('loginFormError', true));
    setTimeout(() => dispatch(valueSet('loginFormError', false)), 1000);
  }, 1350, { trailing: false }),
});

const FormBaseWithLogin = connect(mapStateToProps, mapDispatchToProps)(FormBase);

const Form = reduxForm({
  form: 'login',
  destroyOnUnmount: true,
})(FormBaseWithLogin);

const LoginForm = ({ noJS }) => (
  <LoginWrapper noJS={noJS}>
    <LoginLogo src="/img/logo.png" alt="Logo Mighdy" />
    <Form noJS={noJS} />
  </LoginWrapper>
);

LoginForm.propTypes = {
  noJS: PropTypes.bool.isRequired,
};

export default LoginForm;
