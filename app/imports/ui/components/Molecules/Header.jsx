import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { base, scroll } from '/imports/api/redux/actions';
import { Link } from 'react-router-dom';
import Svg from '/imports/ui/components/Atoms/Svg';

const line = `
  display: block;
  width: 100%;
  height: .2em;
  margin: 0 0 .2em;
  transition: transform .2s ease-in-out;
  border-radius: .05em;
  background: #FFF;
`;

const HeaderWrapper = styled.header`
  height: ${props => props.theme.header.height};
  top: 0;
  background: ${props => props.theme.header.bg};
  position: fixed;
  width: 100%;
  z-index: ${props => props.theme.header.zIndex};
  transition: 1s;
  box-shadow: 0 1px 3px -1px rgba(0,0,0,.40);
`;

const StyledSvgHome = styled(Svg)`
  position: relative;
  display: inline-block;
  height: 60px;
  width: 60px;
  padding: 10px;
  fill: #FFF;
  vertical-align: sub;
`;

const HomeButton = styled(props => (
  <Link to="/" {...props}>
    <StyledSvgHome icon="home" />
  </Link>
))`
  position: absolute;
  top: 0;
  right: 5px;
  height: 60px;
  width: 60px;
`;

const MenuLine = styled.span`
  ${line}
`;

const Button = styled.button`
  position: absolute;
  height: ${props => props.theme.header.button.height};
  width: ${props => props.theme.header.button.width};
  background: transparent;
  background-size: contain;
  border: none;
  outline: none;
  transition: 0.5s;
  font-size: 30px;
  padding: 0;
  border: 0 none;
  outline: 0;
  background-color: transparent;
  transition: transform .2s ease-in-out;
  height: auto;
  width: 40px;
  margin-right: 1em;
  z-index: 1;
  top: 15px;
  left: 15px;
  &:after {
    ${line}
    content: " ";
    margin: 0;
  }
  &:before {
    ${line}
    content: " ";
  }
`;

const Header = ({ isMenuOpen, toggleMenu }) => (
  <HeaderWrapper className="header">
    <Button isActive={isMenuOpen} onClick={toggleMenu}><MenuLine /></Button>
    <HomeButton />
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
