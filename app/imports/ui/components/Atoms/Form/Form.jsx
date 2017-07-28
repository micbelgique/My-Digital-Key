import styled from 'styled-components';
import React from 'react';

const Form = styled.form`
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
`;

export default props => (<Form {...props} onClick={e => e.stopPropagation()} method="post" />);
