import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Dropdown = styled.div`
  display: block;
  position: relative;
  height: auto;
  max-height: 40px;
  width: 80%;
  font-family: "Source Sans Pro", serif;
  font-weight: 700;
  font-size: 14px;
  text-align: left;
  margin: 0 auto;
  transition: .15s;
  vertical-align: top;
  &:hover {
    box-shadow: 0 1px 3px 0 rgba(50, 50, 50, .15);
  }
  ${props => props.isOpen && 'max-height: none;'}
  @media only screen and (max-width: 490px) {
    width: 90%;
  }
`;

const HeadLabel = styled.label`
  display:block;
  background: #c9c9c9;
  color: black;
  border: $color2 solid 2px;
  font-size: 1.25em;
  line-height: 40px;
  font-weight: 500;
  padding: 0 .5em;
  border-radius: 1px 3px 3px 1px;
  text-align: center;
`;

const Arrow = styled.i`
  box-shadow: 0 0 3px 0 rgba(50, 50, 50, .3);
  width: 22px;
  height: 22px;
  transition: 0.45s ease-in-out;
  position: absolute;
  pointer-events: none; // So we can click on the icon because otherwise it blocks the click that should be arriving on the checkbox element since it's on top of it.
  top: 10px;
  right: 8px;
  border-radius: 100%;
  &:before , &:after{
    content: " ";
    position: absolute;
    background: #ccc;
    width: 2px;
    height: 10px;
    right: 10px;
    top: 7px;
    box-shadow: inset 0 0.3px 0.3px 0.3px rgba(50, 50, 50, .3);
  }
  &:before{
    transform: translate( 3px , 0 ) rotate( 45deg );
  }

  &:after{
    transform: translate( -3px , 0 ) rotate( -45deg );
  }
`;

const Wrapper = styled.div`
  display: block;
  position: absolute;
  height: auto;
  width: 100%;
  overflow: hidden;
  transition: .45s;
  box-shadow: 0 0 2px 0 rgba(50,50,50,.3);
  border-radius: 0 0 5px 5px;
  transform-origin: top;
  transform: scaleY(0);
  z-index: 99;
  max-height: 150px;
  background: #c9c9c9;
`;

const HeadCheckbox = styled.input`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 40px;
  opacity: 0;
  appearance: none;
  cursor: pointer;
  &:checked + ${HeadLabel} {
    border-bottom-right-radius:0;
    border-bottom-left-radius:0;
  }
  &:checked + ${Arrow} {
    transform: rotate(-180deg);
  }
  &:checked ~ ${Wrapper} {
    transform: scaleY(1);
    overflow-y: auto;
  }
`;

const ElementLabel = styled.label`
  display: block;
  font-size: .875em;
  line-height:32px;
  font-weight: 700;
  padding: 4px 8px;
  margin: 0;
  border-radius: 0;
  box-shadow: 0 -3px 2px -2px rgba(50, 50, 50, 0.15);
  transition: 0.1s;
  text-align: center;
  text-decoration: none;
  color: black;
  &:hover {
    color: ${props => props.theme.colors.border};
  }
  &:active {
    background: #c9c9c9;
  }
  ${props => props.isCurrent && `
    background: #F9F9F9;
    color: #6B6B6B;
    border-left: 8px solid #2b2e31;
    box-shadow: 0 2px 5px 1px rgba(50, 50, 50, 0.15);
  `}
`;

const Element = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  &:after {
    color: #666;
    font-size: 1.75em;
  }
  & + ${ElementLabel}:last-of-type {
    border-radius: 0 0 3px 3px;
  }
`;

const ElementCheckbox = styled.input`
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 40px;
  opacity: 0;
  appearance: none;
  cursor: pointer;
`;

const RadioDropdown = ({
  input, placeholder, deployed, deploy, list,
  meta: { touched, error, warning, pristine, form },
}) => (
  <Dropdown role="presentation" onClick={e => e.stopPropagation()}>
    <HeadCheckbox type="checkbox" id={input.form + input.name} checked={deployed} onClick={deploy} />
    <HeadLabel htmlFor={input.form + input.name}>
      <span>{placeholder}</span>
      <Arrow />
    </HeadLabel>
    <Wrapper>
      {list.map(choice => (
        <Element key={choice.key}>
          <ElementLabel htmlFor={input.name + choice.val} isCurrent={input.value === choice.val}>{choice.name}</ElementLabel>
          <ElementCheckbox {...input} value={choice.val} type="radio" id={input.name + choice.val} />
        </Element>
        ),
      )}
    </Wrapper>
  </Dropdown>
);

RadioDropdown.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  deployed: PropTypes.bool.isRequired,
  deploy: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    warning: PropTypes.string,
    pristine: PropTypes.bool,
    form: PropTypes.string,
  }).isRequired,
};

export default RadioDropdown;
