import React from 'react';
import { Table, TBody, TR, TD } from 'oy-vey';


export default (props) => {
  return (
    <Table width='100%'
      style={{ WebkitTextSizeAdjust: '100%', msTextSizeAdjust: '100%', msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', margin: '0px auto' }}>
      <TBody>
        <TR>
          <TD>
            {/* Centered column */}
            <Table
              style={{ WebkitTextSizeAdjust: '100%', msTextSizeAdjust: '100%', msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', margin: '0px auto', backgroundColor: '#F7F7F7', width: '100%', maxWidth: '650px' }}>
              <TBody>
                <TR>
                  <TD>
                    {props.children}
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
