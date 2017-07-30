import React from 'react';
import styled from 'styled-components';
import Svg from '/imports/ui/components/Atoms/Svg';
import StyledLink from '/imports/ui/components/Atoms/MenuStyledLink';
import CategoryEl from '/imports/ui/components/Atoms/MenuCategoryEl';
import PropTypes from 'prop-types';

const OptionSvg = styled(Svg)`
${props => !props.disconnect ? `
  position: relative;
  display: inline - block;
  width: 90px;
  height: 90px;
  margin: 15px 0;
  fill: #FFF;
  vertical - align: sub;`
  : `
    position: relative;
    display: inline - block;
    width: 25px;
    height: 25px;
    margin: 0 15px;
    fill: #FFF;
    vertical - align: sub;
`}
`;

const LinkText = styled.span`
${props => props.disconnect ? `
    position: absolute;
    bottom: 0;
    height: auto;
    line-height: 1.5em;
    text-align: center;
    padding: 0;
    margin: 0;
  ` : `
    display: block;
    position: relative;
    width: 100%;
    line-height: 1.25em;
    padding-bottom: 5px;
    text-decoration: none;
    outline: none;
    color: #FFF;
  `}
`;

const Option = ({ name, href, active, icon, disconnect }) => (
  <CategoryEl>
    <StyledLink disconnect={disconnect} option active={active} to={href}>
      <OptionSvg icon={icon} disconnect={disconnect} />
      <LinkText>{name}</LinkText>
    </StyledLink>
  </CategoryEl>
);

Option.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Option;
