import { Field, FieldArray, reduxForm, reset } from 'redux-form';
import React from 'react';
import Form from '/imports/ui/components/Atoms/Form/Form';
import FormLine from '/imports/ui/components/Atoms/Form/FormLine';
import Text from '/imports/ui/components/Atoms/Form/Text';
import RadioDropdown from '/imports/ui/components/Atoms/Form/RadioDropdown';
import Button from '/imports/ui/components/Atoms/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, withApollo, compose } from 'react-apollo';
import ApolloClient from 'apollo-client';
import Svg from '/imports/ui/components/Atoms/Svg';
import moment from 'moment';
import styled from 'styled-components';
import { valueSet } from 'meteor/ssrwpo:ssr';
import { base } from '/imports/api/redux/actions';
import 'moment/locale/fr';
import BillingModal from '/imports/ui/components/Organisms/BillingModal';
import ClientsModal from '/imports/ui/components/Organisms/ClientsModal';
import pick from 'lodash/pick';

moment.locale('fr');

const GlassSvg = styled(Svg)`
  margin: 0;
  padding: 0;
  height: 30px;
  width: 30px;
  vertical-align: middle;
`;

const get30DaysEndOfMonth = () => moment().add(30, 'days').endOf('month').format('DD MMMM YYYY');

const getCurrentFormattedDate = () => moment().format('DD MMMM YYYY');

const invoicesQuery = gql`
  query invoicesQuery {
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

const clientsQuery = gql`
  query clientsQuery {
    clients {
      id
      name
    }
  }
`;

const createBill = (res, mutate, client, resetBilling) => {
  const items = res.items.map(item => pick(item, ['itemId', 'price', 'quantity', 'name']));
  const result = {
    items,
    clientId: res.client.id,
    tva: 21.00,
  };
  mutate({
    variables: { input: result },
    update: (store, { data: { createInvoice } }) => {
      try {
        // Try to get data from store and if there is, patch it.
        const data = store.readQuery({ query: invoicesQuery });
        data.invoices.push(createInvoice);
        store.writeQuery({ query: invoicesQuery, data });
      } catch (e) {
        // No data in store so force refetch
        setTimeout(() => client.query({ query: invoicesQuery }), 0);
      }
    },
  });
  resetBilling();
};

const renderSubFields = (item, index, fields) => (
  <FormLine key={index}>
    <Field disabled={fields.get(index).isLocked} third name={`${item}.name`} component={Text} placeholder="Nom" />
    <Field disabled={fields.get(index).isLocked} third name={`${item}.price`} component={Text} placeholder="Prix" />
    <Field third name={`${item}.quantity`} component={Text} placeholder="Quantité" />
    <Button type="button" background="neg" onClick={() => fields.remove(index)}>-</Button>
  </FormLine>
);

const itemList = ({ fields, openModal }) => (
  <div>
    {fields.map(renderSubFields)}
    <Button type="button" half background="spe" onClick={openModal}><GlassSvg icon="glass" /></Button>
    <Button type="button" half background="pos" onClick={() => fields.push({})}>+</Button>
  </div>
);

const clientsSelect = ({ input, list }) => (
  <select {...input}>
    {list.map(({ id, name }) => (
      <option value={id}>{name}</option>
    ))}
  </select>
);

const ModalInputWrapper = styled.div`
  border: 3px solid #E4E4E4;
  background: transparent;
  outline: none;
  cursor: pointer;
`;

const ModalInputInput = styled.input`
  display: none;
`;

const ModalInputPlaceholder = styled.span`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 1.4em;
  line-height: 1.6em;
  font-weight: 300;
  text-transform: capitalize;
  color: #A8A8A8;
  min-height: 1.6em;
`;

const ModalInput = ({ placeholder, value, onClick }) => (
  <ModalInputWrapper onClick={onClick} >
    <ModalInputPlaceholder>{placeholder}</ModalInputPlaceholder>
    <ModalInputInput value={value} readOnly />
  </ModalInputWrapper>
);

ModalInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const BillingForm = ({
  openModal, closeModal, modalBodyClicked, isBillingModalOpen,
  openClientsModal, closeClientsModal, isClientsModalOpen,
  client, // Apollo client
  data, handleSubmit, mutate, resetBilling,
}) => (
  <div>
    {isBillingModalOpen ?
      <BillingModal
        handleOverlayClick={closeModal}
        handleBodyClick={modalBodyClicked}
        handleModalClose={closeModal}
      />
    : null}
    {isClientsModalOpen ?
      <ClientsModal
        handleOverlayClick={closeClientsModal}
        handleBodyClick={modalBodyClicked}
        handleModalClose={closeClientsModal}
        data={data}
      />
    : null}
    {data.loading || data.error ?
    null :
    <Form onSubmit={handleSubmit(res => createBill(res, mutate, client, resetBilling))}>
      <Field name="client" component={props => <ModalInput placeholder={props.input.value.name} value={props.input.value.id} {...props} />} onClick={openClientsModal} />
      <FieldArray name="items" component={itemList} openModal={openModal} />
      <Button type="submit" background="pos">Ajouter</Button>
    </Form>}
  </div>
);

BillingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  resetBilling: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalBodyClicked: PropTypes.func.isRequired,
  isBillingModalOpen: PropTypes.bool.isRequired,
  client: PropTypes.instanceOf(ApolloClient).isRequired,
  openClientsModal: PropTypes.func.isRequired,
  closeClientsModal: PropTypes.func.isRequired,
  isClientsModalOpen: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    clients: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = (store, ownProps) => ({
  isBillingModalOpen: store.isBillingModalOpen,
  isClientsModalOpen: store.isClientsModalOpen,
  initialValues: (
    ownProps.data.loading || ownProps.data.error ? {} :
    { client: ownProps.data.clients[0].id }
  ),
});

const mapDispatchToProps = dispatch => ({
  resetBilling() {
    dispatch(reset('billing'));
  },
  openModal() {
    dispatch(valueSet('isBillingModalOpen', true));
  },
  closeModal() {
    dispatch(valueSet('isBillingModalOpen', false));
  },
  modalBodyClicked() {
    dispatch(base.bodyClicked());
  },
  openClientsModal() {
    dispatch(valueSet('isClientsModalOpen', true));
  },
  closeClientsModal() {
    dispatch(valueSet('isClientsModalOpen', false));
  },
});

const createInvoiceMutation = gql`
  mutation CreateInvoice($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
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

export default withApollo(
  compose(
    graphql(clientsQuery),
    graphql(createInvoiceMutation),
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: 'billing',
      destroyOnUnmount: false,
      enableReinitialize: true,
      keepDirtyOnReinitialize: true,
    }),
  )(BillingForm),
);
