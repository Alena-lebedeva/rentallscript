import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SeeAll.css';
import {
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import history from '../../../core/history';

class SeeAll extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    history.push('/s');
  }

  render() {
    return (
      <div className={cx(s.seeAllContainer)}>
        <Button
          bsStyle="link"
          className={cx(s.seeAllBtn)}
          onClick={() => this.handleClick()}
        >
          <FormattedMessage {...messages.seeAll} />
          <FontAwesome.FaAngleRight className={s.seeAllBtnIcon} />
        </Button>
      </div>
    );
  }
}

export default withStyles(s)(SeeAll);