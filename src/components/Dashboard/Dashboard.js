import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Style
import {
  Grid,
  Row,
  Col,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';

// Component
import VerifiedInfo from '../VerifiedInfo';
import Avatar from '../Avatar';
import Link from '../Link';
import UnreadMessages from './UnreadMessages';

// Graphql 
import UnreadThreadsQuery from './getUnreadThreads.graphql';

// Locale
import messages from '../../locale/messages';

class Dashboard extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    account: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      picture: PropTypes.string,
    }).isRequired,
    allUnreadThreads: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUnreadThreads: PropTypes.array
    }),
    siteName: PropTypes.string.isRequired
  };

  static defaultProps = {
    allUnreadThreads: {
      loading: true,
      getUnreadThreads: []
    },
    account: {
      userId: null,
      picture: null
    }
  }

  render() {
    const { account: { userId, picture }, siteName } = this.props;
    const { allUnreadThreads: { loading, getUnreadThreads } } = this.props;
    const { formatMessage } = this.props.intl;
    let newMessages = 0;
    if (!loading) {
      newMessages = getUnreadThreads != null ? getUnreadThreads.length : 0;
    }
    let messageCount = formatMessage(messages.messages) + ` (${newMessages} ` + formatMessage(messages.messagesNew) + ')';

    return (
      <div className={cx(s.pageContainer, s.space4, 'ViewProfile')}>
        <Grid>
          <Row className={s.containerResponsive}>
            <Col xs={12} sm={12} md={4} lg={3} className={s.smPadding}>
              <div className={cx(s.slideShow, s.space3, s.hideSm)}>
                <Avatar
                  isUser
                  height={190}
                  width={190}
                  className={s.imgResponsive}
                />
              </div>
              <div className={cx(s.slideShowImages, s.space3, s.showSm, s.mediaRound)}>
                <Avatar
                  isUser
                  height={130}
                  width={130}
                  className={s.imgResponsive}
                />
              </div>
              <VerifiedInfo userId={userId} />
            </Col>

            <Col xs={12} sm={12} md={8} lg={9} className={s.smPadding}>
              <Panel className={s.panelHeader} header={formatMessage(messages.dashBoardHeader) + ' ' + siteName}>
                <div className={s.panelBody}>
                  <p>
                    <FormattedMessage {...messages.dashBoardInfo} />
                  </p>
                  <ul className={s.listStyle}>
                    <li>
                      <p><FormattedMessage {...messages.dashBoardInfo1} /></p>
                      <Link to={"/user/edit"}><FormattedMessage {...messages.completeYourProfile} /></Link>
                    </li>
                  </ul>
                </div>
              </Panel>
              <Panel className={cx(s.panelBorder, s.panelHeader, s.meassageBg)} header={messageCount}>
                <UnreadMessages
                  userId={userId}
                  loading={loading}
                  getUnreadThreads={getUnreadThreads}
                />
                <Link to={"/inbox"} className={s.textCenter}><FormattedMessage {...messages.allMessages} /></Link>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => ({
  account: state.account.data,
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(UnreadThreadsQuery, {
    name: 'allUnreadThreads',
    options: {
      ssr: false,
      pollInterval: 5000,
      fetchPolicy: 'network-only'
    }
  })
)(Dashboard);
