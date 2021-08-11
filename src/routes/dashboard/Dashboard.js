import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import Dashboard from '../../components/Dashboard';
class Progressbar extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.container}>
        <Dashboard />
      </div>
    );
  }
}

export default withStyles(s)(Progressbar);
