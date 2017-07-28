import { Field, reduxForm, reset } from 'redux-form';
import React from 'react';
import Form from '/imports/ui/components/Atoms/Form/Form';
import FormLine from '/imports/ui/components/Atoms/Form/FormLine';
import Text from '/imports/ui/components/Atoms/Form/Text';
import Button from '/imports/ui/components/Atoms/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const addClient = (res, mutate) => {
  res.zipcode = parseInt(res.zipcode, 10);
  mutate({ variables: { input: res } });
};

const AddClientForm = ({ handleSubmit, mutate }) => (
  <Form onSubmit={handleSubmit(res => addClient(res, mutate))}>
    <FormLine>
      <Field component={Text} name="name" placeholder="Nom ou raison sociale" />
      <Field component={Text} name="legalForm" placeholder="Forme juridique" />
    </FormLine>
    <FormLine>
      <Field component={Text} name="manager" placeholder="Représentant" />
      <Field component={Text} name="tva" placeholder="Numéro de TVA" />
    </FormLine>
    <FormLine>
      <Field component={Text} name="street" placeholder="Rue" />
      <Field component={Text} name="streetNumber" placeholder="Numéro d'immeuble" />
    </FormLine>
    <FormLine>
      <Field component={Text} name="city" placeholder="Ville" />
      <Field component={Text} name="zipcode" placeholder="Code postal" />
    </FormLine>
    <FormLine>
      <Field third component={Text} name="phone" placeholder="Numéro de fixe" />
      <Field third component={Text} name="mobilePhone" placeholder="Numéro de portable" />
      <Field third component={Text} name="fax" placeholder="Numéro de fax" />
    </FormLine>
    <FormLine>
      <Field full component={Text} name="email" placeholder="Adresse email" />
    </FormLine>
    <Button background="pos">Ajouter</Button>
  </Form>
);

AddClientForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  reset() {
    dispatch(reset('addClient'));
  },
});

const createClient = gql`
  mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
      id
    }
  }
`;

export default graphql(createClient)(reduxForm({
  form: 'addClient',
  destroyOnUnmount: false,
})(connect(mapStateToProps, mapDispatchToProps)(AddClientForm)));
