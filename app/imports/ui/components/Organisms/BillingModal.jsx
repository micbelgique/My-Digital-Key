import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Modal from '/imports/ui/components/Molecules/Modal';
import { arrayPush, Field, FieldArray, reduxForm, formValueSelector, change, arrayRemove } from 'redux-form';
import { connect } from 'react-redux';
import Form from '/imports/ui/components/Atoms/Form/Form';
import FormLine from '/imports/ui/components/Atoms/Form/FormLine';
import Text from '/imports/ui/components/Atoms/Form/Text';
import Button from '/imports/ui/components/Atoms/Button';
import Checkbox from '/imports/ui/components/Atoms/Form/Checkbox';

const renderSubFields = (item, index, fields) => (
  <FormLine key={index}>
    <span style={{ width: '33.33%' }}>{fields.get(index).name}</span>
    <Field third name={`${item}.quantity`} component={Text} placeholder="Quantité" />
    <Field name={`${item}.checked`} component={Checkbox} />
  </FormLine>
);

const itemList = ({ fields }) => (
  <div>
    {fields.map(renderSubFields)}
  </div>
);

const addToInvoice = (res, addToList, changeItem, removeItem, store, close) => {
  res.items.forEach((item) => {
    const selector = formValueSelector('billing');
    const items = selector(store.getState(), 'items') || [];
    const itemIndex = items.findIndex(e => e.itemId === item.id);
    const foundItem = items[itemIndex];
    const isPresent = itemIndex !== -1;
    if (!item.checked && isPresent) {
      return removeItem(itemIndex);
    }
    if (item.checked && !isPresent) {
      return addToList({
        itemId: item.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        isLocked: true,
      });
    }
    if (item.checked && isPresent && item.quantity !== foundItem.quantity) {
      return changeItem(itemIndex, {
        itemId: item.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        isLocked: true,
      });
    }
    return false;
  });
  close();
};

const BillingModal = ({
  handleSubmit, handleModalClose, fields, addToList, changeItem, removeItem, data: { loading, error }, ...rest
}, { store }) => (
  <Modal {...rest}>
    {!loading && !error ? (
      <Form
        onSubmit={handleSubmit(res => addToInvoice(res, addToList, changeItem, removeItem, store, handleModalClose))}
      >
        <FieldArray name="items" component={itemList} />
        <Button background="spe" type="submit" />
      </Form>
    ) : null}
  </Modal>
);

BillingModal.contextTypes = {
  store: PropTypes.object.isRequired,
};

BillingModal.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    invoiceItems: PropTypes.object,
  }).isRequired,
  fields: PropTypes.object.isRequired,
  addToList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  changeItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

const billingItems = gql`
  query InvoiceItems {
    invoiceItems {
      id
      name
      description
      price
    }
  }
`;

const mapStateToProps = (state, { data: { loading, error, invoiceItems } }) => {
  const selector = formValueSelector('billing');
  const items = selector(state, 'items');
  return {
    initialValues: (loading || error) ? {} : {
      items: invoiceItems.map((item) => {
        const itemInInvoice = items ? items.filter((i) => {
          const present = i.itemId === item.id;
          return present;
        }) : [];
        return {
          ...item,
          checked: itemInInvoice.length !== 0,
          quantity: (itemInInvoice.length !== 0 ? itemInInvoice[0].quantity : 1),
        };
      }),
    },
  };
};

const mapDispatchToProps = dispatch => ({
  addToList(values) {
    dispatch(arrayPush('billing', 'items', values));
  },
  changeItem(index, values) {
    dispatch(change('billing', `items[${index}]`, values));
  },
  removeItem(index) {
    dispatch(arrayRemove('billing', 'items', index));
  },
});

const reduxFormBillingModal = reduxForm({
  form: 'billingModal',
  destroyOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(BillingModal);

export default graphql(billingItems)(connect(mapStateToProps,
  mapDispatchToProps)(reduxFormBillingModal));

