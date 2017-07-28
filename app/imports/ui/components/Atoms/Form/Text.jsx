import React from 'react';
import Svg from '/imports/ui/components/Atoms/Svg';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputSvg = styled(Svg)`
  width: 40px;
  display: inline-block;
  height: 40px;
  padding: 3px 10px 3px 3px;
  position: absolute;
  left: 5px;
  top: 5px;
  fill: ${props => props.theme.colors.secondary};
`;

const Input = styled.input`
  min-width: 200px;
  width: 100%;
  display: block;
  transition: border .3s;
  border: 0;
  border-bottom: 3px solid ${props => props.theme.colors.border};
  border-radius: 4px 4px 1px 1px;
  box-shadow: 0 0px 1px 0 rgba(50, 50, 50, .6);
  font-weight: 300;
  padding: 8px 0;
  text-indent: 1em;
  outline:none;
  color: ${props => props.theme.colors.tertiary};
  &::placeholder {
    color: ${props => props.theme.colors.border};
  }
  &:focus {
    border-bottom: 3px solid ${props => props.theme.colors.borderActive};
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const Text = ({ className, input, icon, placeholder, tag,
  meta: { touched, error, pristine }, ...rest
}) => (
  <div className={className}>
    {icon ? <InputSvg icon={icon} /> : null}
    <Input
      {...input}
      valid={!error && touched && !pristine}
      error={error && touched} placeholder={placeholder}
      {...rest}
    />
    {tag}
  </div>
);

Text.propTypes = {
  input: PropTypes.object.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  tag: PropTypes.element,
  className: PropTypes.string,
};

Text.defaultProps = {
  className: '',
  placeholder: '',
  tag: null,
  icon: false,
};

const StyledText = styled(Text)`
  position: relative;
  display: block;
  height: auto;
  width: 50%;
  border: none;
  margin: 5px 0;
  padding: 0 5px;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
  ${props => (props.full && `
    width: 100%;
  `)}
  ${props => (props.third && `
    width: 33.333%;
  `)}
  @media only screen and (max-width: 960px) {
    width: 100%;
    padding: 0;
  }
`;

StyledText.propTypes = {
  full: PropTypes.bool,
  third: PropTypes.bool,
};

StyledText.defaultProps = {
  full: false,
  third: false,
};

export default StyledText;
