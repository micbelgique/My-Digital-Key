import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({ icon, className }) => (
  <svg className={className}>
    <use xlinkHref={`/img/sprite.svg#${icon}`} />
  </svg>
);

Svg.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Svg;

