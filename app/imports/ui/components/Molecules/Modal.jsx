import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${props => props.theme.modal.zIndex};
  display: block;
`;

const ModalWrapper = styled.div`
  display: block;
  width: 50%;
  position: absolute;
  margin: auto;
  top: calc(50% + ${props => props.theme.header.height});
  right: 0;
  left: 0;
  background-color: ${props => props.theme.modal.wrapperBgc};
  border-radius: 7px 7px 3px 3px;
  box-shadow: 0 1px 3px 0 rgba(50, 50, 50, 0.3);
  transform: translateY(calc(-50% - ${props => parseInt(props.theme.header.height, 10) / 2}px)) ${props => props.isMenuLocked &&
   `translateX(${parseInt(props.theme.menu.width, 10) / 2}px)`};
  z-index: ${props => props.theme.modal.zIndex};
  transition: .5s;
  @media only screen and (max-width: 1280px) {
    width: 90%;
    top: calc(50% + ${props => props.theme.header.height});
    transform: translateY(calc(-50% - ${props => parseInt(props.theme.header.height, 10) / 2}px));
  }
`;

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  outline: none;
`;

const ModalHead = styled.div`
  overflow:hidden;
  position: relative;
  height: ${props => props.theme.modal.head.height};
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
  z-index: ${props => props.theme.modal.zIndex - 2};
`;

const ModalTitle = styled.h2`
  position: relative;
  text-align: center;
  margin: 0;
  display: inline-block;
  width: calc(100% - ${props => props.theme.modal.close.width});
  line-height: ${props => props.theme.modal.head.height};
`;

const ModalClose = styled.button`
  cursor: pointer;
  font-size: 3em;
  width: ${props => props.theme.modal.close.width};
  height: ${props => props.theme.modal.head.height};
  top: 0;
  right: 0;
  position: absolute;
  text-align: center;
  color: ${props => props.theme.colors.borderActive};
  box-shadow: 0 0px 1px 1px rgba(0, 0, 0, 0.3);
  background: transparent;
  border: 0;
  font-weight: 200;
  font-size: 46px;
  line-height: 43px;
  outline: none;
`;

const ModalContent = styled.div`
  position: relative;
  overflow: auto;
  height: auto;
  padding: 0 5px 15px 5px;
  max-height: calc(70vh - ${props => props.theme.header.height} - ${props => props.theme.modal.head.height});
  @media only screen and (max-width: 960px) {
    max-height: calc(90vh - ${props => props.theme.header.height} - ${props => props.theme.modal.head.height});
  }
`;

class Modal extends Component {

  componentDidMount() {
    this.modalClose.focus();
  }

  handleClose = (e) => {
    if (e.keyCode === 27) this.props.handleModalClose();
  }

  render() {
    const {
      handleOverlayClick, handleBodyClick, handleModalClose, title, children, isMenuLocked,
    } = this.props;
    return (
      <ModalOverlay role="button" onClick={handleOverlayClick}>
        <ModalWrapper role="presentation" onClick={e => e.stopPropagation()} isMenuLocked={isMenuLocked}>
          <ModalBody tabindex="0" onKeyUp={this.handleClose} role="presentation" onClick={handleBodyClick}>
            <ModalHead>
              <ModalTitle>{title}</ModalTitle>
              <ModalClose
                innerRef={node => (this.modalClose = node)}
                onKeyUp={this.handleClose} onClick={handleModalClose}
              >
                &times;
              </ModalClose>
            </ModalHead>
            <ModalContent>
              {children}
            </ModalContent>
          </ModalBody>
        </ModalWrapper>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  handleOverlayClick: PropTypes.func.isRequired,
  handleBodyClick: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  isMenuLocked: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  isMenuLocked: (store.menu.isOpen && store.menu.isLocked),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
