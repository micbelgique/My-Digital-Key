import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(({ active, option, disconnect, ...rest }) => <Link {...rest} />)`
${props => !props.disconnect ? `
  position: relative;
  display: block;
  background: rgba(255,255,255,0.22);
  box-shadow: 0 3px 6px rgba(0,0,0,0.04);
  width: 80%;
  padding: 0;
  text-align: center;
  margin: 10px auto 0 auto;
  height: auto;
  line-height: 1.25em;
  text-decoration: none;
  outline: none;
  color: #FFF;
` : `
  position: relative;
  display: block;
  background: rgba(255,255,255,0.22);
  box-shadow: 0 3px 6px rgba(0,0,0,0.04);
  width: 100%;
  padding: 5px 0 0 0;
  text-align: center;
  margin: 10px 0 0 0;
  height: auto;
  line-height: 1.25em;
  text-decoration: none;
  outline: none;
  color: #FFF;
`}`;

export default StyledLink;
