import styled from 'styled-components';

const H1 = styled.h1`
  position: relative;
  width: 100%;
  padding: 20px 0;
  background: rgba(255,255,255,0.22);
  color: white;
  font-weight: bold;
  font-size: 1.3em;
  text-shadow: 0 3px 6px rgba(0,0,0,0.23);
  text-align: center;
  box-shadow: 0 3px 6px rgba(0,0,0, 0.04);
  border-bottom: 1px solid rgba(149,152,154,0.22);
`;

const H2 = styled.h2`
  font-size: 1.45em;
  font-weight: 300;
  display: block;
  width: 100%;
  margin: 10px 0;
  text-align: left;
  background: #6EBDEB;
  color: white;
  padding: 10px 20px;
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
