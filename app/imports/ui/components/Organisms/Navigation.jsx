import React from 'react';
import styled from 'styled-components';
import Menu from '/imports/ui/components/Molecules/Menu';
import Header from '/imports/ui/components/Molecules/Header';

const categories = [
  { name: 'Applications',
    links: [
      { name: 'Dashboard', href: '/' },
      { name: 'Ajouter un client', href: '/add-client' },
      { name: 'Prospection', href: '/prospecting' },
      { name: 'Facturation', href: '/billing' },
      { name: 'Ajouter un produit', href: '/add-item' },
    ],
  },
  { name: 'Options',
    links: [
      { name: 'Mon compte', href: '/account', icon: 'account' },
      { name: 'Assistance', href: '/support', icon: 'assistance' },
      { name: 'Paramètres', href: '/settings', icon: 'settings' },
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
