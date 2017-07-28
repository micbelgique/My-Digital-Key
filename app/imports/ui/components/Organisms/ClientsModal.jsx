import React from 'react';
import PropTypes from 'prop-types';
import Modal from '/imports/ui/components/Molecules/Modal';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import Button from '/imports/ui/components/Atoms/Button';

const changeAndClose = (client, changeItem, close) => {
  changeItem({ id: client.id, name: client.name });
  close();
};

const BillingModal = ({
  handleModalClose, changeItem, data: { loading, error, clients }, ...rest
}) => (
  <Modal {...rest}>
    {!loading && !error ? (
      clients.map(client => (
        <div>
          <span>{client.name}</span>
          <Button onClick={() => changeAndClose(client, changeItem, handleModalClose)} background="pri" type="button" />
        </div>
      ))
    ) : null}
  </Modal>
);

BillingModal.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    clients: PropTypes.object,
  }).isRequired,
  changeItem: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  changeItem(value) {
    dispatch(change('billing', 'client', value));
  },
});

export default connect(mapStateToProps,
  mapDispatchToProps)(BillingModal);
