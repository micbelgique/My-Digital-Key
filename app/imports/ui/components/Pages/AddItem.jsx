import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import AddItemForm from '/imports/ui/components/Organisms/AddItemForm';

const AddItem = () => (
  <Main>
    <Wrapper>
      <H1>Ajouter un produit</H1>
      <AddItemForm />
    </Wrapper>
  </Main>
);

export default AddItem;
