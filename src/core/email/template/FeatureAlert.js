import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename } from '../../../config';

class FeatureAlert extends React.Component {

  static propTypes = {
    content: PropTypes.shape({
      email: PropTypes.string.isRequired,
      feature: PropTypes.string.isRequired
    })
  };

  render() {
    const buttonStyle = {
      margin: 0,
      fontFamily: 'Arial',
      padding: '10px 16px',
      textDecoration: 'none',
      borderRadius: '2px',
      border: '1px solid',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'normal',
      fontSize: '18px',
      whiteSpace: 'nowrap',
      background: '#ffffff',
      borderColor: '#ff5a5f',
      backgroundColor: '#ff5a5f',
      color: '#ffffff',
      borderTopWidth: '1px',
    };

    const textStyle = {
      color: '#484848',
      backgroundColor: '#F7F7F7',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding: '35px'
    };

    const textBold = {
      fontWeight: 'bold'
    };

    const { content: { email, feature } } = this.props;
    let today = moment().format('ddd, Do MMM, YYYY')
    return (
      <Layout>
        <Header color="#FF5A5F" backgroundColor="#F7F7F7" />
        <Body textStyle={textStyle}>
          <div>
            Hi Admin,
          </div>
          <EmptySpace height={20} />
          <div>
            {email} subscribed to get notification on <span style={textBold}>{feature}</span> at {today}
          </div>
          <EmptySpace height={30} />
          <div>
            Thanks, <br />
            The {sitename} Team
          </div>
        </Body>
        <Footer />
        <EmptySpace height={20} />
      </Layout>
    );
  }

}

export default FeatureAlert;