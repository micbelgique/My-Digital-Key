import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { base } from '/imports/api/redux/actions';

const Main = styled.main`
  min-height: 100vh;
  z-index: ${props => props.theme.main.zIndex};
  width: 100%;
  padding: ${props => `${parseInt(props.theme.header.height, 10) + 20}px 0 20px 0`};
  position: relative;
  overflow: auto;
  transition: .5s padding-left;
  ${props => ((props.isLocked && props.isOpen) && `
    @media only screen and (min-width: 960px) {
      padding-left: 250px!important;
    }
  `)}
`;

const mapStateToProps = store => ({
  isLocked: store.menu.isLocked,
  isOpen: store.menu.isOpen,
});

const mapDispatchToProps = dispatch => ({

  bodyClicked() {
    dispatch(base.bodyClicked());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(({ bodyClicked, locked, ...rest }) => (
  <Main onClick={bodyClicked} locked={locked} {...rest} />
));
