import React from 'react';
import styled from 'styled-components';
import Menu from '/imports/ui/components/Molecules/Menu';
import Header from '/imports/ui/components/Molecules/Header';

const categories = [
  { name: 'Applications',
    links: [
      { name: 'Serrures', href: '/locks', icon: 'keyhole' },
      { name: 'Clés', href: '/keys', icon: 'key' },
    ],
  },
  { name: 'Options',
    links: [
      { name: 'Déconnexion', href: '/disconnect', icon: 'disconnect' },
    ],
  },
];

const NavigationWrapper = styled.div`
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
`;

const Navigation = () => (
  <NavigationWrapper>
    <Header />
    <Menu categories={categories} />
  </NavigationWrapper>
);

export default Navigation;
