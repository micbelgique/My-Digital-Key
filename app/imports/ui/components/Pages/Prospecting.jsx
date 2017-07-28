import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '/imports/ui/components/Atoms/Main';
import { H1 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import Table from '/imports/ui/components/Atoms/Table';
import Button from '/imports/ui/components/Atoms/Button';
import gql from 'graphql-tag';
import { graphql, withApollo, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import * as LightboxActionCreators from '/imports/api/redux/actions/lightbox';

const ITEMS_PER_PAGE = 50;

const agenciesQuery = gql`
  query agencies($offset: Int, $limit: Int) {
    agencies(offset: $offset, limit: $limit) {
      id
      lastMod
      fetched
      url
      notes
      screenshots {
        id
      }
      contactInfo {
        website
        name
        gsm
        fixe
        address
      }
      properties {
        category
        sell
        rent
      }
    }
  }
`;

const Textarea = ({ input, onBlur }) => <textarea onBlur={onBlur} {...input} style={{ fontSize: '1.5em', minWidth: '200px', width: '100%', height: '150px' }} />;

Textarea.propTypes = {
  input: PropTypes.object.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const agenciesHeaders = ['Nom', 'GSM/Fixe', 'Adresse', 'URLs', 'Biens', 'Screenshots', 'Notes'];

class Prospecting extends Component {

  componentDidMount() {
    require('react-image-lightbox-universal/dist/umd/bundle.min.css');
  }

  getMapLink = address => `https://www.google.be/maps/place/${encodeURIComponent(address)}`;

  saveNote = (id, res) => {
    this.props.mutate({
      variables: { input: { id, notes: res[`notes${id}`] } },
      update: (store, { data: { updateNotes } }) => {
        try {
          // Try to get data from store and if there is, patch it.
          const data = store.readQuery({ query: agenciesQuery });
          const agencyIndex = data.agencies.findIndex(e => e.id === id);
          data.agencies[agencyIndex] = {
            ...data.agencies[agencyIndex],
            notes: updateNotes.notes,
          };
          store.writeQuery({ query: agenciesQuery, data });
        } catch (e) {
          // No data in store so force refetch
          setTimeout(() => this.props.client.query({ query: agenciesQuery }), 0);
        }
      },
    });
  }

  openAndSet = (list) => {
    const formattedList = list.map(e => `/files/${e.id}.png`);
    this.createLightbox(formattedList);
    this.props.lightboxCurrent(0);
    this.props.lightboxOpen();
  }

  createLightbox = (list) => {
    this.props.lightboxCreate(list, 0);
  }

  render() {
    const { loading, error, agencies, loadMoreAgencies, handleSubmit } = this.props;
    const getTotal = (properties, type) => properties
      .reduce((acc, property) => (acc + parseInt(property[type], 10)), 0);
    return (
      <Main>
        <Wrapper>
          <H1>Prospection</H1>
          {(!loading && !error) ?
            <Table
              headers={agenciesHeaders}
              rows={agencies.map(e => ({
                values: Object.values(({
                  name: e.contactInfo.name,
                  phone: (
                    <div>
                      <span style={{ whiteSpace: 'nowrap', display: 'block' }}>{e.contactInfo.fixe}</span>
                      <span style={{ whiteSpace: 'nowrap', display: 'block' }}>{e.contactInfo.gsm}</span>
                    </div>
                  ),
                  address: <a href={this.getMapLink(e.contactInfo.address)} rel="noopener noreferrer" target="_blank">{e.contactInfo.address}</a>,
                  url: <div><a style={{ display: 'block', lineHeight: '35px' }} href={e.url} rel="noopener noreferrer" target="_blank">Fiche Immoweb</a>{e.contactInfo.website ? <a style={{ display: 'block', lineHeight: '35px' }} href={e.contactInfo.website} target="_blank">Site web</a> : null}</div>,
                  biens: (
                    <div>
                      <span style={{ whiteSpace: 'nowrap', display: 'block' }}>Vente: {getTotal(e.properties, 'sell')}</span>
                      <span style={{ whiteSpace: 'nowrap', display: 'block' }}>Location: {getTotal(e.properties, 'rent')}</span>
                    </div>
                  ),
                  screenshot: <Button onClick={() => this.openAndSet(e.screenshots)} full type="submit" disabled={e.screenshots.length === 0} background={e.screenshots.length === 0 ? 'spe' : 'pri'}>Screens</Button>,
                  notes: <Field name={`notes${e.id}`} onBlur={handleSubmit(res => this.saveNote(e.id, res))} component={Textarea} />,
                })),
                key: e.id,
              }))}
            />
            : null
          }
          <Button full onClick={loadMoreAgencies} type="button" background="neu">Charger plus</Button>
        </Wrapper>
      </Main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  lightboxCurrent(current) {
    dispatch(LightboxActionCreators.lightboxCurrent(current));
  },

  lightboxCreate(list, current) {
    dispatch(LightboxActionCreators.lightboxCreate(list, current));
  },

  lightboxUpdate(list) {
    dispatch(LightboxActionCreators.lightboxUpdate(list));
  },

  lightboxOpen() {
    dispatch(LightboxActionCreators.lightboxOpen());
  },
});

const mapStateToProps = (state, { loading, error, agencies }) => ({
  initialValues: (loading || error) ? {} : agencies.reduce((acc, agency) => ({
    ...acc,
    [`notes${agency.id}`]: agency.notes || '',
  }), {}),
});

Prospecting.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  agencies: PropTypes.object.isRequired,
  lightboxCurrent: PropTypes.func.isRequired,
  lightboxCreate: PropTypes.func.isRequired,
  lightboxOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  loadMoreAgencies: PropTypes.func.isRequired,
};

const updateNotesMutation = gql`
  mutation UpdateNotes($input: UpdateNotesInput!) {
    updateNotes(input: $input) {
      id
      notes
    }
  }
`;

export default withApollo(
  compose(
    graphql(agenciesQuery, {
      options() {
        return {
          variables: {
            offset: 0,
            limit: ITEMS_PER_PAGE,
          },
          fetchPolicy: 'cache-first',
        };
      },
      props({ data: { loading, error, agencies, fetchMore } }) {
        return {
          error,
          loading,
          agencies,
          loadMoreAgencies() {
            return fetchMore({
              query: agenciesQuery,
              variables: {
                offset: agencies.length,
                limit: ITEMS_PER_PAGE,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;
                return {
                  agencies: [
                    ...previousResult.agencies,
                    ...fetchMoreResult.agencies,
                  ],
                };
              },
            });
          },
        };
      },
    }),
    graphql(updateNotesMutation),
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: 'prospecting',
      destroyOnUnmount: false,
      enableReinitialize: true,
      keepDirtyOnReinitialize: true,
    }),
  )(Prospecting),
);
