import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1, H2 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  background: #EFF3FE;
  min-height: 200px;
`;

const HistoryEntry = styled.div`
  border-top: 1px solid #52267e;
  border-bottom: 1px solid #52267e;
  margin: 2px 0;
  padding: 10px 20px;
  overflow: auto;
`;

const Img = styled.div`
  position: relative;
  border-right: 1px solid #52267e;
  width: 50px;
  height: 50px;
  float: left;
  background: url(${props => props.src}) no-repeat center;
  background-size: cover;
`;

const TextContainer = styled.div`
  font-size: 0.75em;
  margin-left: 70px;
  min-height: 45px;
`;

const TimeStamp = styled.div`
  float: right;
`;

const Dashboard = () => (
  <Main>
    <Wrapper>
      <H1>Dashboard</H1>
      <H2>Historique des utilisateurs</H2>
      <HistoryContainer>
        <HistoryEntry>
          <Img src="/img/logo.png" />
          <TextContainer><b>Robert Perreault</b> a déverrouillé la porte à Rue Bois des Fosses 104 9931 Oostwinkel<br /><TimeStamp>Il y a 2 minutes</TimeStamp></TextContainer>
        </HistoryEntry>
      </HistoryContainer>
    </Wrapper>
  </Main>
);

Dashboard.propTypes = {};

export default Dashboard;
