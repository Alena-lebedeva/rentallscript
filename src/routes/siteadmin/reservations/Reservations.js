import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservations.css';

// Query
import reservationsQuery from './reservationsQuery.graphql';

// Component
import ReservationManagement from '../../../components/siteadmin/ReservationManagement';
import Loader from '../../../components/Loader';

class Reservations extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllReservationAdmin: PropTypes.array,
    })
  };

  render () {
    const { data: { loading } } = this.props;
    if(loading){
      return <Loader type={"text"} />;
    }

    const { data, data: { getAllReservationAdmin, refetch }, title } = this.props;
    return <ReservationManagement 
      data={data} 
      title={title}
      refetch={refetch} 
    />
  }

}

export default compose(
    withStyles(s),
    graphql(reservationsQuery,
    {
      options: {
        variables: {
          currentPage: 1,
          searchList: ''
        },
        fetchPolicy: 'network-only',
        ssr: false
      }
    }),
)(Reservations);
