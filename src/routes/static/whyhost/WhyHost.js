import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHost.css';

// Components
import Test from './Test';

class EditProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;
    return (
      <div>
        <Test />
      </div>
    );
  }
}

export default withStyles(s)(EditProfile);
