import React from 'react';
import { Table, TBody, TR, TD } from 'oy-vey';

import EmptySpace from './EmptySpace';
import * as FontAwesome from 'react-icons/lib/fa';


export default (props) => {
  const textStyle = {
    color: '#484848',
    backgroundColor: '#F7F7F7',
    fontFamily: 'Arial',
    fontSize: '18px',
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
    fontWeight: 'normal',
    fontSize: '14px',
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
    letterSpacing: -'1px',
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

  return (
    <div>
      <Table width="100%" >
        <TBody>
          <TR>
            <TD
              style={textStyle}>
              <EmptySpace height={20} />
              <h1 style={bookingTitle}>
                New booking confirmed! <br />
                <span>Mark arrives</span> <br />
                <span>05 Apr</span>
              </h1>
              <div>
                Send a message to confirm check-in details or welcome Mark.
            </div>
              <EmptySpace height={20} />
              <div >
                <img style={profilePic} src="https://ci5.googleusercontent.com/proxy/pW-ZxwY00eUGO58QXchruugPoUdw9MQ5UqSoULxZvX5_jelgyjPbsNi2zhscQhkoOJdtNfPGuDbdQp_NJNZzl4157mMl44npXoUutvOm6fSXJ91q9Pds4ASNwwdeNjQR6_nBXgtDb0hUW2z1ynVOmwW6TZAd6iuSnK6SMc8-=s0-d-e1-ft#https://a0.muscache.com/im/users/4053036/profile_pic/1436857457/original.jpg?aki_policy=profile_x_medium" height={125} />
              </div>
              <EmptySpace height={20} />
              <span style={userName}>Mark Benfield</span><br />
              <span>Norwich, England, United Kingdom </span><br />
              <span>member since 2012</span>
              <EmptySpace height={20} />
              <div>
                <a style={buttonStyle}>
                  Contact Guest
              </a>
              </div>
              <EmptySpace height={20} />
            </TD>
          </TR>
        </TBody>
      </Table>
      <Table width="100%">
        <TBody>
          <TR style={textStyle}>
            <TD >
              <strong>Check In</strong><br />
              <span>Fri, 19 May, 2017 </span><br />
              <span>Flexible check in time</span>
            </TD>
            <TD>
              <FontAwesome.FaChevronRight />
            </TD>
            <TD >
              <strong>Check Out</strong><br />
              <span>Fri, 19 May, 2017 </span><br />
              <span>Flexible check Out time</span>
            </TD>
          </TR>
          <TR style={textStyle}>
            <TD>
              <EmptySpace height={30} />
              <div>
                <span>Guests</span><br />
                <span>1</span>
              </div>
            </TD>
            <TD>&nbsp;</TD>
            <TD>

              <EmptySpace height={30} />
              <div>
                <span>Confirmation Code</span><br />
                <span>HM5XW3QJNX</span>
              </div>
              <a>View  itinerary</a>
            </TD>
          </TR>
        </TBody>
      </Table>
      <EmptySpace height={30} />
    </div>
  );
};
