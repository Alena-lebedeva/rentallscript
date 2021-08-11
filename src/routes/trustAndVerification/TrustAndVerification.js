import React from 'react';
import PropTypes from 'prop-types';
import {graphql, gql, compose} from 'react-apollo';

// Redux
import {connect} from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TrustAndVerification.css';
import {
  Grid,
  Row,
  Col 
} from 'react-bootstrap';
import cx from 'classnames';

// Components
import Trust from '../../components/Trust';
import EditProfileSideMenu from '../../components/EditProfileSideMenu';
import Loader from '../../components/Loader';

class TrustAndVerification extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getUserVerifiedInfo: PropTypes.object,
    }),
    account: PropTypes.shape({
      userId: PropTypes.string.isRequired, 
    }).isRequired
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };

  render () {
    const { data: { loading, getUserVerifiedInfo }, title } = this.props;
    return (
      
          <div className={s.container}>
            <Grid>
              <Row className={cx(s.landingContainer)}>
                <Col xs={12} sm={3} md={3} lg={3} className={s.smPadding}>
                  <EditProfileSideMenu />
                </Col>
                <Col xs={12} sm={9} md={9} lg={9} className={s.smPadding}>
                 {
                   loading && <Loader type={"text"} /> 
                 }

                 {
                    !loading && <Trust data={getUserVerifiedInfo} />
                 }
                </Col>
              </Row>
            </Grid>
          </div>

    );
  }

}

const mapState = (state) => ({
  account: state.account.data
});

const mapDispatch = {};

export default compose(
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(gql `
        query ($userId: String!) {
          getUserVerifiedInfo (userId: $userId) {
            id
            isEmailConfirmed
            isFacebookConnected
            isGoogleConnected
            isIdVerification
            status
          }
        }
      `,
      {
        options: (props) => ({
          variables : {
            userId: props.account.userId,
          },
          ssr: false,
        })
      }      
    ),
)(TrustAndVerification);



