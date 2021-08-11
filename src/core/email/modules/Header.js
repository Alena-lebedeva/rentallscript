import React from 'react';
import PropTypes from 'prop-types';
import { Table, TBody, TD, TR, Img } from 'oy-vey';
import EmptySpace from './EmptySpace';
import { url, sitename } from '../../../config';

const Header = (props) => {
  const style = {
    color: props.color,
    fontWeight: 'bold',
    backgroundColor: '#F7F7F7',
    width: '100%'

  };

  return (
    <Table
      width="100%"
      style={style}
      color={props.color}>
      <TBody>
        <TR>
          <TD>
            <Table width="100%">
              <TBody>
                <TR>
                  <TD
                    style={{ color: props.color, fontFamily: 'Arial', fontSize: '28px', textAlign: 'center' }}>
                    <EmptySpace height={20} />
                    <Img src={url + "/images/logo/" + props.logo} width={150} alt={sitename} />
                  </TD>
                </TR>
              </TBody>
            </Table>
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};

Header.propTypes = {
  color: PropTypes.string.isRequired
};

export default Header;
