import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1, H2 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import ElementBlock from '/imports/ui/components/Atoms/ElementBlock';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql, withApollo, compose } from 'react-apollo';

const LocksQuery = gql`
query digitalLocks {
  digitalLocks {
    id
    name
    address
    owner
    img
  } 
}
`;

const Locks = ({ data: { loading, error, digitalLocks } }) => (
  <Main>
    <Wrapper>
      <H1>Serrures</H1>
      {loading || error ? null : digitalLocks.map(e => (
        <Link to={`/lock/${e.id}`}><ElementBlock {...e} keyNumber={1} /></Link>
      ))}
    </Wrapper>
  </Main>
);

Locks.propTypes = {};

export default graphql(LocksQuery)(Locks);
