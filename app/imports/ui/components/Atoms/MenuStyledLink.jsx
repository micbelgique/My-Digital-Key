import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(({ active, option, ...rest }) => <Link {...rest} />)`
  font-weight: 400;
  color: #494949;
  text-decoration: none;
  font-size: 1.2em;
  &:before {
    margin-right: -0.6em;
    transition: 0.35s;
    width: 0.6em;
    transform: scale(0);
    border-radius: 100%;
    height: 0.6em;
    top: -0.05em;
    content: " ";
    display: inline-block;
    position: relative;
  }
  ${props => (!props.active ?
    `
    &:hover {
      color: #D6D6D6;
    }
    &:hover:before {
      background: rgba(147,147,147,0.4);
      box-shadow: 0px 1px 2px 1px rgba(147,147,147,0.5);
      margin-right: 8px;
      transform: scale(1);
    }
    ` : '')
  }
  ${props => (props.active ?
    `
    &:before{
        background: rgb(99,99,99);
        box-shadow: 0px 1px 2px 1px rgba(99,99,99,0.5);
        margin-right: 8px;
        transform: scale(1);
    }
    ` : '')
  }
  ${props => (props.option ?
    `
    &:before {
      content: none;
    }
    margin-left: 8px;
    ` : '')
  }
  ${props => ((props.option && props.active) ?
    `
    color: #D6D6D6;
    ` : '')
  }
`;

export default StyledLink;
