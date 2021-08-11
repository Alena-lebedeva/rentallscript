import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewReceipt.css';

//Component
import Receipt from '../../Receipt';

class ViewReceipt extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
  };

  render() {
    const { data, title } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, "print-pagecontentWrapper", "print-noMargin")}>
        <div className={s.contentBox}>
          <h1 className={cx(s.headerTitle, "hidden-print")}>{title}</h1>
          <Receipt data={data} />
        </div>
      </div>
    );
  }

}

export default withStyles(s)(ViewReceipt);



