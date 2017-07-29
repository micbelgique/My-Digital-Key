import React from 'react';
import { withRouter } from 'react-router-dom';
import Option from '/imports/ui/components/Atoms/MenuOption';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { base } from '/imports/api/redux/actions';

const LockButton = styled.button`
  background: transparent;
  outline: none;
  user-select: none;
  border: none;
  height: 35px;
  width: 35px;
  position: absolute;
  display: inline-block;
  top: 10px;
  right: 10px;
  z-index: 1;
  @media only screen and (max-width: 960px) {
    display: none;
  }
`;

const LockHead = styled.path`
  transition: .3s transform;
  ${props => (props.isLocked ? 'transform: translateY(30%);' : '')}
`;

const LockSvg = ({ isLocked }) => (
  <svg
    version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title"
    x="0px" y="0px" viewBox="-44 570.8 446.1 560"
  >
    <title id="title">Icône de verrou</title>
    <LockHead isLocked={isLocked} d="M111.8,791.6v-53.4C111.8,699,142,667,179,667c37.1,0,67.2,31.9,67.2,71.2c0,9.7,7.8,17.5,17.5,17.5H325c9.7,0,17.5-7.8,17.5-17.5c0-92.3-73.4-167.4-163.5-167.4S15.5,645.9,15.5,738.2v53.4 M50.5,791.6v-53.4l0,0c0-73,57.6-132.4,128.5-132.4c65.1,0,119,50.1,127.4,114.9h-26.5C271.8,670.5,229.7,632,179,632c-56.4,0-102.2,47.6-102.2,106.2v53.4" />
    <path fill="#7e7bb7" d="M367,1077.8c0,10-7.5,18-16.7,18H7.7c-9.2,0-16.7-8.1-16.7-18V844.6c0-9.9,7.5-18,16.7-18h342.7c9.2,0,16.7,8.1,16.7,18L367,1077.8L367,1077.8z" />
    <path d="M350.3,791.6H7.6c-28.5,0-51.7,23.8-51.7,53v233.2c0,29.2,23.2,53,51.7,53h342.7c28.5,0,51.7-23.8,51.7-53V844.6C402,815.4,378.8,791.6,350.3,791.6z M366.9,1077.8c0,10-7.5,18-16.7,18H7.6c-9.2,0-16.7-8.1-16.7-18V844.6c0-9.9,7.5-18,16.7-18h342.7c9.2,0,16.7,8.1,16.7,18L366.9,1077.8z" />
    <path d="M230.6,925.2c0-28.5-23.2-51.6-51.6-51.6c-28.5,0-51.6,23.2-51.6,51.6c0,14.6,6,28.1,16.4,37.7l-12.4,55.5c-0.3,1.3-0.4,2.5-0.4,3.8c0,15.2,14.9,26.6,34.6,26.6h27.1c19.7,0,34.5-11.4,34.5-26.6c0-1.3-0.1-2.6-0.4-3.8l-12.4-55.5C224.6,953.3,230.6,939.7,230.6,925.2z M168.2,1013.9l10.8-48.3l10.8,48.3H168.2z M186.6,940c-3.4,1.8-6,4.5-7.6,7.8c-1.6-3.3-4.2-6-7.6-7.8c-5.5-2.9-9-8.6-9-14.8c0-9.2,7.5-16.6,16.6-16.6c9.2,0,16.6,7.5,16.6,16.6C195.6,931.4,192.2,937.1,186.6,940z" />
  </svg>
);

LockSvg.propTypes = {
  isLocked: PropTypes.bool.isRequired,
};

const Nav = styled.nav`
  z-index: ${props => props.theme.menu.zIndex};
  display: flex;
  flex-direction: column;
  position: fixed;
  height: ${props => `calc(100% - ${props.theme.header.height})`};
  bottom: 0;
  overflow-y: auto;
  padding: 45px 0 0 0;
  background: ${props => props.theme.menu.bgc};
  transition: 0.5s;
  box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.4);
  width: ${props => props.theme.menu.width};
  ${props => (props.isOpen ? 'transform: translateX(0)' : 'transform: translateX(-100%)')};
  @supports (background-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
    background: rgba(255,255,255,0.4);
    backdrop-filter: blur(15px)!important;
  }
`;

const Category = styled.div`
  position: relative;
  display: block;
  padding: 0;
  ${props => (props.bottom ? 'margin: auto 0 0 0' : 'margin: 0')};
`;

const CategoryName = styled.span`
  color: #727170;
  text-transform: uppercase;
  display: inline-block;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 15px;
  font-weight: 300;
  font-size: 1em;
  line-height: 2em;
  border-right: 3px solid ${props => props.theme.colors.borderActive};
  width: 100%;
  display: none;
`;

const CategoryList = styled.ul`
  position: relative;
  display: block;
  padding: 0;
  margin: 0;
`;

const isActive = (current, link) => link.split('/')[1].split('?')[0] === current.split('/')[1];

const Menu = ({ categories, isOpen, isLocked, toggleLock, url }) => (
  <Nav isOpen={isOpen} >
    <LockButton title="Vérouiller le menu" onClick={toggleLock}><LockSvg isLocked={isLocked} /></LockButton>
    {categories.map(category => (
      <Category bottom={category.name === 'Options'} key={category.name}>
        <CategoryName>{category.name}</CategoryName>
        <CategoryList>
          {category.links.map(({ name, href, icon }) => (
            href !== '/disconnect' ? <Option
              name={name} href={href} icon={icon}
              active={isActive(url, href)} key={name + href + icon}
            /> : <Option
              name={name} href={href} icon={icon} disconnect
              active={isActive(url, href)} key={name + href + icon}
            />
          ))}
        </CategoryList>
      </Category>
    ))}
  </Nav>
);

Menu.propTypes = {
  categories: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  toggleLock: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

const mapStateToProps = (store, ownProps) => ({
  isOpen: store.menu.isOpen,
  isLocked: store.menu.isLocked,
  url: ownProps.location.pathname,
});

const mapDispatchToProps = dispatch => ({

  toggleLock() {
    dispatch(base.toggleLock());
  },

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
