import React from 'react';
import { Table, TBody, TR, TD, A } from 'oy-vey';
import { sitename } from '../../../config';

const Footer = (props) => {
  const style = {
    backgroundColor: '#f7f7f7',
  };

  const spaceStyle = {
    paddingBottom: '25px',
    paddingLeft: '5px',
    color: '#9ca299',
    fontSize: '14px',
    textAlign: 'center',
  };

  return (
    <Table width="100%" style={style}>
      <TBody>
        <TR>
          <TD>
            <div style={spaceStyle}>Sent with &#10084; from {sitename}</div>
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};

export default Footer;
