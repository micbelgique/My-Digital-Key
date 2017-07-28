import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1, H2 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import Table from '/imports/ui/components/Atoms/Table';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

const clientsAndInvoicesQuery = gql`
  query clientsAndInvoicesQuery {
    clients {
      id
      name
      manager
      mobilePhone
    }
    invoices {
      id
      tva
      elements {
        id
        invoiceItem {
          id
          name
          description
          price
        }
        quantity
        discount
      }
    }
  }
`;

const clientsHeaders = ['Dénomination', 'Représentant', 'GSM'];
const invoicesHeaders = ['ID', 'TVA'];

const Dashboard = ({ data: { loading, error, clients, invoices } }) => (
  <Main>
    <Wrapper>
      <H1>Dashboard</H1>
      <H2>Nouveaux clients</H2>
      {(!loading && !error) ?
        <Table
          headers={clientsHeaders}
          rows={clients.map(e => ({
            values: Object.values(pick(e, ['name', 'manager', 'mobilePhone'])),
            key: e.id,
          }))}
        />
        : null
      }
      <H2>Factures récentes</H2>
      {(!loading && !error) ?
        <Table
          headers={invoicesHeaders}
          rows={invoices.map(e => ({
            values: Object.values(pick(e, ['id', 'tva'])),
            key: e.id,
          }))}
        />
        : null
      }
    </Wrapper>
  </Main>
);

Dashboard.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    clients: PropTypes.object,
    invoices: PropTypes.object,
  }).isRequired,
};

export default graphql(clientsAndInvoicesQuery)(Dashboard);
