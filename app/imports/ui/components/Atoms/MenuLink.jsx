import React from 'react';
import StyledLink from '/imports/ui/components/Atoms/MenuStyledLink';
import CategoryEl from '/imports/ui/components/Atoms/MenuCategoryEl';
import PropTypes from 'prop-types';

const Link = ({ name, href, active }) => (
  <CategoryEl>
    <StyledLink active={active} to={href}>{name}</StyledLink>
  </CategoryEl>
);

Link.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Link;
