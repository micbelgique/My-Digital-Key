import React from 'react';
import styled from 'styled-components';

const LoginTextContainer = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  display: block;
`;

const LoginText = ({ input, meta: { touched, error, warning, pristine }, ...rest }) => (
  <LoginTextContainer>
    <LoginInput {...input} {...rest} />
  </LoginTextContainer>
);

const LoginInput = styled.input`
  width: 100%;
  display: block;
  margin: 0;
  padding: 0;
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 3px #F4F4F7 solid;
  color: #F4F4F7;
  text-align: left;
  font-size: 1em;
  line-height: 2em;
  ::placeholder {
    color: #E6E7E9;
  }
`;

export default LoginText;
