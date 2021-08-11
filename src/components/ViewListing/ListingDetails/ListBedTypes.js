import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingDetails.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

class ListBedTypes extends React.Component {
  static propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string,
        settingsType: PropTypes.shape({
          typeName: PropTypes.string
        }),
      }),
      spacesId: PropTypes.string,
    })).isRequired,
    label: PropTypes.string.isRequired,
  };

  render() {
    const { itemList, label } = this.props;
    let result; let finalArray = [];

    if (itemList && itemList.length > 0) {
      result = itemList.reduce((acc, o) => (acc[o.listsettings.itemName] = (acc[o.listsettings.itemName] || 0) + 1, acc), {});
    }
    // let result = itemList.reduce((acc, o) => (acc[o.listsettings.itemName] = (acc[o.listsettings.itemName] || 0) + 1, acc), {});

    if (result) {
      finalArray = Object.keys(result).map(function (key) {
        return [key, Number(result[key])];
      });

    }

    return (
      <div className={cx(s.horizontalLineThrough)}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space1)}>
            <p className={s.textMutedNew}> {label} </p>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop1)}>
            <Row>
              <Col md={12} lg={12}>
                {
                  finalArray.map((item, i) => {
                    return (
                      <p key={i} className={s.splitList}>
                        {
                          item.map((inner, index) => {
                            return (
                              <span key={index}>{inner}{index == (item.length - 1) ? "" : ": "}</span>
                            )
                          })
                        }
                      </p>
                    )
                  })
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

}

export default injectIntl(withStyles(s)(ListBedTypes));