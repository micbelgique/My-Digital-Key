import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { base, scroll } from '/imports/api/redux/actions';

const HeaderWrapper = styled.header`
  height: ${props => props.theme.header.height};
  top: 0;
  background-color: ${props => props.theme.header.bgc};
  position: fixed;
  width: 100%;
  z-index: ${props => props.theme.header.zIndex};
  transition: 1s;
  box-shadow: 0 1px 3px -1px rgba(0,0,0,.40);
`;

const Button = styled.button`
  height: ${props => props.theme.header.button.height};
  width: ${props => props.theme.header.button.width};
  background: ${props => `url(${props.theme.header.button.bgi}) no-repeat center`};
  background-size: contain;
  border: none;
  outline: none;
  transition: 0.5s;
  box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.45);
  ${props => (!props.isActive ? '' : `
      background-color: ${props.theme.header.button.openBgc};
      box-shadow: inset -1px 0 10px 1px rgba(0, 0, 0, 0.15);`)}
  &:hover {
    background-color: ${props => props.theme.header.button.hoverBgc};
  }
`;

const Header = ({ isMenuOpen, toggleMenu }) => (
  <HeaderWrapper className="header">
    <Button isActive={isMenuOpen} onClick={toggleMenu} />
  </HeaderWrapper>
);

Header.propTypes = {
  isMenuOpen: PropTypes.Boolean.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  isMenuOpen: store.menu.isOpen,
});

const mapDispatchToProps = dispatch => ({

  toggleMenu() {
    dispatch(base.toggleMenu());
  },

  closeMenu() {
    dispatch(base.closeMenu());
  },

  toggleScroll() {
    dispatch(scroll.toggleScroll());
  },

  enableScroll() {
    dispatch(scroll.enableScroll());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
