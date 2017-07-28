import styled from 'styled-components';

const H1 = styled.h1`
  border-left: ${props => props.theme.colors.borderActive} solid 8px;
  background: ${props => props.theme.colors.secondary};
  text-align: center;
  border-radius: 1px 5px 1px 1px;
  line-height: 3.5em;
  font-size: 2em;
  font-weight: 300;
  margin: 10px 0;
  box-shadow: 0 0 2px 0 rgba(50, 50, 50, 0.3);
`;

const H2 = styled.h2`
  font-size: 2em;
  font-weight: 300;
  display: block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
  &:after, &:before {
    content: " ";
    display: inline-block;
    position: relative;
    height: 2px;
    width: 50px;
    background: ${props => props.theme.colors.borderActive};
    vertical-align: middle;
    margin: 0 8px;
  }
`;

const H3 = styled.h3`
  font-size: 1.2em;
  font-weight: 300;
  display: block;
  margin: 0;
  margin: 10px 0;
  color: ${props => props.theme.colors.tertiary};
  &:after, &:before {
    content: " ";
    display: inline-block;
    position: relative;
    height: 2px;
    width: 25px;
    background: ${props => props.theme.colors.borderActive};
    vertical-align: middle;
    margin: 0 8px;
  }
`;

export {
  H1,
  H2,
  H3,
};
