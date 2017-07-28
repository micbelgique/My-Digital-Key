import React from 'react';

import LoginMain from '/imports/ui/components/Atoms/LoginMain';
import LoginForm from '/imports/ui/components/Organisms/LoginForm';
import { asymetricSsr } from 'meteor/ssrwpo:ssr';

const LoginFormWrapper = asymetricSsr(LoginForm, props => <LoginForm noJS {...props} />);

const Login = () => (
  <LoginMain>
    <LoginFormWrapper />
  </LoginMain>
);

export default Login;
