import React from 'react';
import PropTypes from 'prop-types';
import {graphql, gql, compose} from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import {
  Grid,
  Row, 
  Col,
  Panel
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TripsContainer.css';

// Graphql
import getAllReservationQuery from './getAllReservationQuery.graphql';

// Component
import SideMenuTrips from '../../components/ManageListing/SideMenuTrips';
import Reservation from '../../components/Reservation';
import NoItem from '../../components/Reservation/NoItem';
import Loader from '../../components/Loader';
import CustomPagination from '../../components/CustomPagination';

// Locale
import messages from '../../locale/messages';

class TripsContainer extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.func,
    userType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getAllReservation: PropTypes.shape({
        count: PropTypes.number,
        reservationData: PropTypes.array
      }),
      refetch: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.paginationData = this.paginationData.bind(this);
  }

  paginationData(currentPage){
    const { data: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  render() {
    const { data: { loading, getAllReservation }, userType, type } = this.props;
    const { currentPage } = this.state;
    const { formatMessage } = this.props.intl;
    let title;
    if(userType === 'host') {
      title = (type == 'current') ? <FormattedMessage {...messages.upcomingReservations} /> : <FormattedMessage {...messages.previousReservations} />;
    } else {
      title = (type == 'current') ? <FormattedMessage {...messages.upcomingTrips} /> : <FormattedMessage {...messages.previousTrips} />;
    }
    return (
        <div className={s.container}>
          <Grid>
            <Row className={s.landingContainer}>
              <SideMenuTrips />
              <Col xs={12} sm={9} md={9} lg={9} className={s.smPadding}>
                <Panel className={s.panelHeader} header={<h3>{title}</h3>}>
                  {
                    loading && <Loader type={"text"} />
                  }
                  {
                    !loading && getAllReservation !== undefined && getAllReservation !== null
                    && getAllReservation.reservationData.length > 0 && <Reservation 
                      data={getAllReservation.reservationData} 
                      userType={userType} 
                    />
                  }
                  {
                    getAllReservation !== undefined && getAllReservation !== null
                    && getAllReservation.reservationData.length > 0 && <CustomPagination
                      total={getAllReservation.count}
                      currentPage={getAllReservation.currentPage}
                      defaultCurrent={1}
                      defaultPageSize={5}
                      change={this.paginationData}
                      paginationLabel={formatMessage(messages.trips)}
                    />
                  }
                  {
                    !loading && getAllReservation !== undefined && getAllReservation !== null
                    && getAllReservation.reservationData.length === 0 && <NoItem 
                      userType={userType} 
                      type={type}
                    />
                  }
                </Panel>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

export default compose(
    injectIntl,
    withStyles(s),
    graphql(getAllReservationQuery,
      {
        options: (props) => ({
          variables : {
            userType: props.userType,
            dateFilter: props.type,
            currentPage: 1
          },
          fetchPolicy: 'network-only',
        })
      }      
    ),
)(TripsContainer);
