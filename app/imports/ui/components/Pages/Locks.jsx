import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1, H2 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import ElementBlock from '/imports/ui/components/Atoms/ElementBlock';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const list = [
  { singleLink: '/lock/1', img: '/img/porte1.jpg', name: 'Maison', keyNumber: 3, address: 'Rue Bois des fosses 104, 9932 Oostiskn' },
  { singleLink: '/lock/2', img: '/img/porte2.jpg', name: 'Châlet', keyNumber: 5, address: 'Rue Bois des fosses 104, 9932 Oostiskn' },
  { singleLink: '/lock/3', img: '/img/porte3.jpg', name: 'Garage', keyNumber: 2, address: 'Rue Bois des fosses 104, 9932 Oostiskn' },
];

const Locks = () => (
  <Main>
    <Wrapper>
      <H1>Serrures</H1>
      {list.map(e => (
        <Link to={e.singleLink}><ElementBlock {...e} /></Link>
      ))}
    </Wrapper>
  </Main>
);

Locks.propTypes = {};

export default Locks;
