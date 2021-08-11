import React from 'react';
import { Table, TBody, TR, TD } from 'oy-vey';

import EmptySpace from './EmptySpace';


export default (props) => {
  return (
    <Table width="100%" >
      <TBody>
        <TR>
          <TD
            style={props.textStyle}>
            {props.children}
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};
