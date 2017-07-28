import React from 'react';
import styled from 'styled-components';

const CheckBoxContainer = styled.div`
  position: relative;
  display: block;
`;

const Input = styled.input`
  position: relative;
  display: block;
`;

const Checkbox = ({ input, disabled, label, meta: { touched, error, warning, pristine, form }}) => (
  <CheckBoxContainer>
    <Input type="checkbox" checked={!!input.value} disabled={disabled} {...input} />
  </CheckBoxContainer>
);

export default Checkbox;
