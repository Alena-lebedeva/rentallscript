import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, TBody, TR, TD } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { checkInData } from '../../../helpers/timeHelper';
import { url, sitename } from '../../../config';

class BookingConfirmationHost extends React.Component {

  static propTypes = {
    content: PropTypes.shape({
      reservationId: PropTypes.number.isRequired,
      threadId: PropTypes.number.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      guestName: PropTypes.string.isRequired,
      guestLastName: PropTypes.string.isRequired,
      guestLocation: PropTypes.string.isRequired,
      guestProfilePic: PropTypes.string.isRequired,
      guestJoinedDate: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
      allowedCheckInTime: PropTypes.string.isRequired,
      allowedCheckOutTime: PropTypes.string.isRequired,
    }).isRequired
  };

  render() {
    const textStyle = {
      color: '#484848',
      backgroundColor: '#F7F7F7',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding: '10px',
      textAlign: 'center'
    };

    const buttonStyle = {
      margin: 0,
      fontFamily: 'Arial',
      padding: '10px 16px',
      textDecoration: 'none',
      borderRadius: '2px',
      border: '1px solid',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '18px',
      whiteSpace: 'nowrap',
      background: '#ffffff',
      borderColor: '#ff5a5f',
      backgroundColor: '#ff5a5f',
      color: '#ffffff',
      borderTopWidth: '1px',

    }

    const bookingTitle = {
      paddingBottom: '25px',
      fontWeight: 'bold',
      fontSize: '40px',
      lineHeight: '48px',
      margin: '0',
      padding: '0',
      textAlign: 'center'

    }

    const profilePic = {
      borderRadius: '999px',
      margin: '0',
      padding: '0',
      lineHeight: '150%',
      borderSpacing: '0',
      width: '125px'
    }

    const userName = {
      color: '#565a5c',
      fontSize: '26px',
      fontWeight: 'bold',
      paddingBottom: '5px',
    }

    const subTitle = {
      color: '#565a5c',
      fontSize: '18px',
      fontWeight: 'bold',
      paddingBottom: '5px',
    }

    const linkText = {
      color: '#ff5a5f',
      fontSize: '18px',
      textDecoration: 'none',
      cursor: 'pointer',
    }

    const space = {
      paddingBottom: '20px',
    }
    const { content: { reservationId, threadId, logo } } = this.props;
    const { content: { guestName, guestLastName, guestLocation, guestProfilePic, guestJoinedDate } } = this.props;
    const { content: { checkIn, checkOut, guests, allowedCheckInTime, allowedCheckOutTime, confirmationCode } } = this.props;
    let checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('ddd, Do MMM, YYYY') : '';
    let checkInDateShort = checkIn != null ? moment(checkIn).format('Do MMMM') : '';
    let guestJoinedYear = guestJoinedDate != null ? moment(guestJoinedDate).format('YYYY') : '';
    let itineraryURL = url + '/users/trips/itinerary/' + reservationId;
    let messageURL = url + '/message/' + threadId + '/host';
    let imageURL;
    if (guestProfilePic) {
      imageURL = url + '/images/avatar/medium_' + guestProfilePic;
    }

    return (
      <Layout>
        <Header color="#FF5A5F" backgroundColor="#F7F7F7" logo={logo} />
        <div>
          <Table width="100%" >
            <TBody>
              <TR>
                <TD style={textStyle}>
                  <EmptySpace height={20} />
                  <h1 style={bookingTitle}>
                    New booking confirmed! <br />
                    <span>{guestName} arrives</span> <br />
                    <span>{checkInDateShort}</span>
                  </h1>
                  <EmptySpace height={20} />
                  <div>
                    Send a message to confirm check-in details or welcome {guestName}.
                    </div>
                  <EmptySpace height={20} />
                  <div>
                    {
                      guestProfilePic && <img style={profilePic} src={imageURL} height={125} />
                    }
                  </div>
                  <EmptySpace height={20} />
                  <div>
                    <span style={userName}>{guestName} {guestLastName}</span><br />
                    <EmptySpace height={5} />
                    <span>{guestLocation}</span><br />
                    <EmptySpace height={5} />
                    <span>{sitename} member since {guestJoinedYear}</span>
                  </div>
                  <EmptySpace height={30} />
                  <div>
                    <a href={messageURL} style={buttonStyle}>Contact Guest</a>
                  </div>
                  <EmptySpace height={40} />
                </TD>
              </TR>
            </TBody>
          </Table>
          <Table width="100%">
            <TBody>
              <TR style={textStyle}>
                <TD style={space}>
                  <span style={subTitle}>Check In</span><br />
                  <EmptySpace height={10} />
                  <span>{checkInDate}</span><br />
                  <EmptySpace height={1} />
                  <span>{
                    checkInData(allowedCheckInTime)
                  }</span>
                </TD>
                <TD style={space}><EmptySpace height={10} /></TD>
                <TD style={space}>
                  <span style={subTitle}>Check Out</span><br />
                  <EmptySpace height={10} />
                  <span>{checkOutDate}</span><br />
                  <EmptySpace height={1} />
                  <span>{
                    checkInData(allowedCheckOutTime)
                  }</span>
                </TD>
              </TR>
              <TR style={textStyle}>
                <TD>
                  <div>
                    <span style={subTitle}>Guests</span><br />
                    <EmptySpace height={10} />
                    <span>{guests}</span>
                  </div>
                </TD>
                <TD><EmptySpace height={10} /></TD>
                <TD>
                  <div>
                    <span style={subTitle}>Confirmation Code</span><br />
                    <EmptySpace height={10} />
                    <span>{confirmationCode}</span>
                    <EmptySpace height={10} />
                  </div>
                </TD>
              </TR>

              <TR style={textStyle}>
                <TD><EmptySpace height={10} /></TD>
                <TD><EmptySpace height={10} /></TD>
                <TD>
                  <div>
                    <a href={itineraryURL} style={linkText}> View Itinerary</a>
                  </div>
                </TD>
              </TR>

            </TBody>
          </Table>
          <EmptySpace height={50} />
        </div>
        <Footer />
        <EmptySpace height={20} />
      </Layout>
    );
  }

}

export default BookingConfirmationHost;