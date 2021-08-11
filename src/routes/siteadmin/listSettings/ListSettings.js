import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListSettings.css';
import ListSettingsManagement from '../../../components/siteadmin/ListSettingsManagement';

class ListSettings extends Component {

  static propTypes = {
  };

  render () {
    const { title } = this.props;

    return <ListSettingsManagement />
  }

}

export default withStyles(s)(ListSettings);
