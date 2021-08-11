// General
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReceiptContainer.css';

// Component
import Receipt from '../../components/Receipt';
import Loader from '../../components/Loader';

// Graphql
import getReceiptQuery from './getReceiptQuery.graphql';

class ReceiptContainer extends React.Component {
  static propTypes = {
    reservationId: PropTypes.number.isRequired,
    receiptData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getItinerary: PropTypes.object.isRequired
    })
  };

  static defaultProps = {
    itineraryData: {
      loading: true,
    }
  };

  render() {
    const { receiptData: { loading, getItinerary } } = this.props;

    if (loading) {
      return (
        <div className={s.root}>
          <Loader type={"text"} show={loading} />
        </div>
      );
    }

    return (
      <div className={s.root}>
        <Receipt data={getItinerary} />
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getReceiptQuery,
    {
      name: 'receiptData',
      options: (props) => ({
        variables: {
          reservationId: props.reservationId,
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
)(ReceiptContainer);
