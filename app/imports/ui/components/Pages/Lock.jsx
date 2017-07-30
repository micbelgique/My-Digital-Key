import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1, H2 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import styled from 'styled-components';

const address = 'Maison';

const ElementDiv = styled.div`
  background: rgba(255,255,255,0.22);
  box-shadow: 0 3px 6px rgba(0,0,0, 0.04);
  color: black;
  padding: 15px;
  margin: 0;
  height: 150px;
  border-bottom: 1px solid white;
  width: 100%;
  transition: .5s;
  ${props => !props.access && 'filter: grayscale(0.5); opacity: 0.5;'}
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

const ImgContainer = styled.span`
  position: relative;
  display: inline-block;
  height: 80px;
  vertical-align: middle;
`;

const PersonImg = styled.div`
  display: block;
  width: 80px;
  height: 80px;
  position: relative;
  ${props => `background: url(${props.src}) no-repeat center`};
  background-size: cover;
`;

const Tags = styled.div`
  position: relative;
  vertical-align: middle;
  display: inline-block;
  margin: 0 0 0 10px;
  padding: 0;
  height: auto;
  width: 135px;
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

const PersonElement = ({ img, name, access }) => (
  <ElementDiv access={access}>
    <Container>
      <ImgContainer><PersonImg src={img} /></ImgContainer>
      <Tags>
        <Tag>{name}</Tag>
        <Tag style={{ 
          float: 'right',
          borderRadius: '100%',
          background: 'rgba(0,0,0, 0.8)',
          width: '30px',
          height: '30px',
          textAlign: 'center',
          color: 'white',
          lineHeight: '22px',
        }}>{access ? 'X' : '+'}</Tag>
      </Tags>
    </Container>
  </ElementDiv>
);

const Img = styled.div`
  position: relative;
  display: inline-block;
  background: url(${props => props.src});
  background-size: cover;
  height: 70px;
  width: 70px;
  vertical-align: middle;
  margin: 0;
  float: left;
`;

const Persons = [
  { name: 'Jean', img: '/img/Jean.jpg', access: true },
  { name: 'Thomas', img: '/img/Thomas.jpg', access: false },
  { name: 'Olivier', img: '/img/Olivier.jpg', access: true },
];

const Lock = (props) => (
  <Main>
    <Wrapper>
      <H1 style={{
        padding: 0,
        overflow: 'auto',
        lineHeight: '71px',
      }}><Img src="/img/porte1.jpg" />{address}</H1>
      <H2>Personnes ayant accès</H2>
      {Persons.map(person => (
        <PersonElement {...person} />
      ))}
    </Wrapper>
  </Main>
);

Lock.propTypes = {};

export default Lock;
