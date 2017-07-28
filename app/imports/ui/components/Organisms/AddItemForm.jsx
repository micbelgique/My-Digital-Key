import { Field, reduxForm, reset } from 'redux-form';
import React from 'react';
import Form from '/imports/ui/components/Atoms/Form/Form';
import FormLine from '/imports/ui/components/Atoms/Form/FormLine';
import Text from '/imports/ui/components/Atoms/Form/Text';
import Button from '/imports/ui/components/Atoms/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';

const invoiceItemsQuery = gql`
  query invoiceItemsQuery {
    invoiceItems {
      id
      name
      description
      price
    }
  }
`;

const addItem = (res, mutate, client) => {
  res.price = parseFloat(res.price);
  mutate({
    variables: { input: res },
    update: (store, { data: { createInvoiceItem } }) => {
      try {
        // Try to get data from store and if there is, patch it.
        const data = store.readQuery({ query: invoiceItemsQuery });
        data.invoiceItems.push(createInvoiceItem);
        store.writeQuery({ query: invoiceItemsQuery, data });
      } catch (e) {
        // No data in store so force refetch
        setTimeout(() => client.query({ query: invoiceItemsQuery }), 0);
      }
    },
  });
};

const AddItemForm = ({ handleSubmit, mutate, client }) => (
  <Form onSubmit={handleSubmit(res => addItem(res, mutate, client))}>
    <FormLine>
      <Field component={Text} name="name" placeholder="Nom du produit" />
      <Field component={Text} name="price" placeholder="Prix à l'unité" />
    </FormLine>
    <FormLine>
      <Field full component={Text} name="description" placeholder="Description de l'article" />
    </FormLine>
    <Button background="pos">Ajouter</Button>
  </Form>
);

AddItemForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  client: PropTypes.instanceOf(ApolloClient).isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  reset() {
    dispatch(reset('addItem'));
  },
});

const createItem = gql`
  mutation CreateInvoiceItem($input: CreateInvoiceItemInput!) {
    createInvoiceItem(input: $input) {
      id
      name
      description
      price
    }
  }
`;

export default withApollo(graphql(createItem)(reduxForm({
  form: 'addItem',
  destroyOnUnmount: false,
})(connect(mapStateToProps, mapDispatchToProps)(AddItemForm))));
