import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import AddClientForm from '/imports/ui/components/Organisms/AddClientForm';

const AddClient = () => (
  <Main>
    <Wrapper>
      <H1>Ajouter un client</H1>
      <AddClientForm />
    </Wrapper>
  </Main>
);

export default AddClient;
