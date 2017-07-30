import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1, H2 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import differenceBy from 'lodash/differenceBy';
import union from 'lodash/union';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { graphql, withApollo, compose } from 'react-apollo';

const usersQuery = gql`
  query usersQuery {
    users {
      _id
      username
      locks
    }
  }
`;

const giveAccessQuery = gql`
  mutation giveAccessQuery($lockId: String!, $userId: String!) {
    giveDigitalLockAccess(lockId: $lockId, userId: $userId)
  }  
`;

const removeAccessQuery = gql`
  mutation removeAccessQuery($lockId: String!, $userId: String!) {
    removeDigitalLockAccess(lockId: $lockId, userId: $userId)
  }
`;

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

const PersonElement = ({ img, username, access, toggleAccess, owner }) => (
  <ElementDiv access={access}>
    <Container>
      <ImgContainer><PersonImg src={`/img/${username}.jpg`} /></ImgContainer>
      <Tags>
        <Tag>{username}</Tag>
        {!owner ? <Tag onClick={toggleAccess} style={{ 
          float: 'right',
          borderRadius: '100%',
          background: 'rgba(0,0,0, 0.8)',
          width: '30px',
          height: '30px',
          textAlign: 'center',
          color: 'white',
          lineHeight: '22px',
        }}>{access ? 'X' : '+'}</Tag> : <Tag style={{ marginTop: '10px' }}>Propriétaire</Tag>}
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

const toggleAccess = (lockId, userId, giveAccessFunc, removeAccessFunc, hasAccess) => {
  const remove = () => removeAccessFunc({
    variables: { userId, lockId },
    update: (store) => {
      try {
        // Try to get data from store and if there is, patch it.
        const data = store.readQuery({ query: usersQuery });
        const userIndex = findIndex(data.users, (user => user._id === userId));
        data.users[userIndex] = {
          ...data.users[userIndex],
          locks: differenceBy(data.users[userIndex].locks, [lockId]),
        };
        store.writeQuery({ query: usersQuery, data });
      } catch (e) {console.error(e)}
    },
  });
  const give = () => giveAccessFunc({
    variables: { userId, lockId },
    update: (store) => {
      try {
        // Try to get data from store and if there is, patch it.
        const data = store.readQuery({ query: usersQuery });
        const userIndex = findIndex(data.users, (user => user._id === userId));
        data.users[userIndex] = {
          ...data.users[userIndex],
          locks: union(data.users[userIndex].locks, [lockId]),
        };
        store.writeQuery({ query: usersQuery, data });
      } catch (e) { console.error(e) }
    },
  });
  if (hasAccess) return remove();
  return give();
};

const OnlyMe = styled.button`
  display: block;
  position: relative;
  width: 100%;
  line-height: 3.5em;
  background: black;
  color: #FFF;
  border: none;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const Lock = ({ match, data: { loading, error, users }, giveAccess, removeAccess }) => (
  <Main>
    <Wrapper>
      <H1 style={{
        padding: 0,
        overflow: 'auto',
        lineHeight: '71px',
      }}><Img src="/img/porte1.jpg" />{address}</H1>
      {loading || error ? <div>Chargement...</div> : users.map((person, index) => (
        index !== 0 ? null : <PersonElement
          owner
          {...person}
          toggleAccess={() => null}
          access={person.locks !== null && findIndex(person.locks, lock => lock === match.params.id) !== -1}
        />
      ))}
      <H2>Personnes ayant accès</H2>
      <OnlyMe onClick={() => users.forEach(person => person._id === "SZTALLRQm9KmSRX7C" ? null : toggleAccess(match.params.id, person._id, giveAccess, removeAccess, true))}>Only me</OnlyMe>
      {loading || error ? <div>Chargement...</div> : users.map((person, index) => (
        index === 0 ? null : <PersonElement
          {...person}
          toggleAccess={() => toggleAccess(match.params.id, person._id, giveAccess, removeAccess, (person.locks !== null && findIndex(person.locks, lock => lock === match.params.id) !== -1))}
          access={person.locks !== null && findIndex(person.locks, lock => lock === match.params.id) !== -1}
        />
      ))}
    </Wrapper>
  </Main>
);

Lock.propTypes = {};

export default compose(
  graphql(usersQuery, {
    options: { pollInterval: 500 },
  }),
  graphql(giveAccessQuery, {
    name: 'giveAccess',
  }),
  graphql(removeAccessQuery, {
    name: 'removeAccess',
  }),
)(Lock);
