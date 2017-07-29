import React from 'react';
import styled from 'styled-components';

const ElementDiv = styled.div`
  background: rgba(255,255,255,0.22);
  box-shadow: 0 3px 6px rgba(0,0,0, 0.04);
  color: black;
  padding: 15px;
  margin: 0;
  height: 150px;
  border-bottom: 1px solid white;
  width: 100%;
`;

const Img = styled.div`
  display: block;
  width: 80px;
  height: 80px;
  position: relative;
  ${props => `background: url(${props.src}) no-repeat center`};
  background-size: cover;
`;

const Tag = styled.span`
  border: 0;
  color: #8E8E8E;
  background: #FFF;
  margin: 0 5px;
  padding: 5px;
  display: inline-block;
  position: relative;
`;

const ImgContainer = styled.span`
  position: relative;
  display: inline-block;
  height: 80px;
  vertical-align: middle;
`;

const Container = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  width: 225px;
  height: 80px;
  vertical-align: middle;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
`;

const Tags = styled.div`
  position: relative;
  vertical-align: top;
  display: inline-block;
  margin: 0 0 0 10px;
  padding: 0;
  height: 100%;
`;

const Address = styled.p`
  display: block;
  position: absolute;
  bottom: 0;
  font-size: 1em;
  color: black;
  padding: 0;
  margin: 0;
`;

const ElementBlock = ({ img, name, keyNumber, address }) => (
  <ElementDiv>
    <Container>
      <ImgContainer><Img src={img} /></ImgContainer>
      <Tags>
        <Tag>{name}</Tag>
        <Tag>{`${keyNumber} clé(s)`}</Tag>
        <Address>{address}</Address>
      </Tags>
    </Container>
  </ElementDiv>
);

export default ElementBlock;
