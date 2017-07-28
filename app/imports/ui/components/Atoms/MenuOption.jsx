import React from 'react';
import styled from 'styled-components';
import Svg from '/imports/ui/components/Atoms/Svg';
import StyledLink from '/imports/ui/components/Atoms/MenuStyledLink';
import CategoryEl from '/imports/ui/components/Atoms/MenuCategoryEl';
import PropTypes from 'prop-types';

const OptionSvg = styled(Svg)`
  position: relative;
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  fill: #707070;
  vertical-align: sub;
`;

const Option = ({ name, href, active, icon }) => (
  <CategoryEl>
    <OptionSvg icon={icon} />
    <StyledLink option active={active} to={href}>{name}</StyledLink>
  </CategoryEl>
);

Option.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Option;
