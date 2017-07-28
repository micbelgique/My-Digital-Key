import React from 'react';
import styled from 'styled-components';

const height = '1em';
const width = '2.5em';

const SwitchboxWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: auto;
  width: auto;
  background: transparent;
  padding: .5em .5em .5em .5em;
  text-align: center;
  vertical-align: middle;
  ${props => props.disabled && `
    cursor: no-drop;
    opacity: .65;
    & > ${SwitchboxLabel}, ${SwitchboxCheckbox} {
      cursor: no-drop;
    }
  `}
`;

const SwitchboxLabel = styled.label`
  display: block;
  padding: .5em 1em 1em 1em;
  text-align: center;
  width: 100%;
  user-select: none;
  cursor: pointer;
`;

const SwitchboxCheckbox = styled(props => (<input type="checkbox" {...props} />))`
  position: relative;
  display: inline-block;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  height: $height;
  width: $width;
  font-size: 2em;
  border-radius: 1.5em;
  background-color: lighten($blackTheme, 60%);
  border: lighten($blackTheme, 55%) 1px solid;
  background-clip: padding-box;
  color: #BFBEBF;
  vertical-align: middle;
  transition: all 0.25s linear 0.25s;
  cursor: pointer;

  &::before {
    content: " ";
    position: absolute;
    height: $height*1.2;
    width: $height*1.2;
    top: -3px;
    left: -1px;
    bottom: 0;
    right: 50%;
    background-color: $color2;
    border-radius: 100%;
    background-clip: padding-box;
    transform-origin: right center;
    box-shadow: 0 0 1px 1px rgba(50, 50, 50, .3);
    animation: switchbox-off-transform 0.25s ease-out forwards;
    transition: background-color 0.25s linear 0.25s;
  }

  &:focus {
    color: darken(#BFBEBF, 5%);
    border-color: transparent;
    background-color: darken(#BFBEBF,5%);
    outline: none;
  }

  &:checked {
    color: darken(#BFBEBF, 5%);
    background-color: $color2;
    border-color: transparent;

    &::before {
      transform-origin: left center;
      background-color: $color2;
      animation: switchbox-on-transform 0.25s ease-out forwards;
    }
  }
`;

const Switchbox = ({ input, className, disabled, label, meta: { touched, error, warning, pristine, form }}) => {
  const classes = ClassNames(className, {'switchbox-disabled': disabled});
  return (
    <div className={classes}>
      <label className='switchbox_label' htmlFor={form+input.name}>{label}</label>
      <input {...input} checked={!!input.value} disabled={disabled} className='switchbox_checkbox' id={form+input.name} type='checkbox' />
    </div>
  );
};

Switchbox.defaultProps = {
  disabled: false,
};

export default Switchbox;
