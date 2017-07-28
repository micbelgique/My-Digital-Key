import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import BillingForm from '/imports/ui/components/Organisms/BillingForm';

const Dashboard = () => (
  <Main>
    <Wrapper>
      <H1>Générer une facture</H1>
      <BillingForm />
    </Wrapper>
  </Main>
);

export default Dashboard;
