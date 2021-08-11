import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewMessage.css';
import ViewMessage from '../../components/ViewMessage';

class ViewMessageContainer extends React.Component {
  static propTypes = {
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired
  };

  render() {
    const { threadId, userType } = this.props;


    return (
      <div className={s.bgColor}>
        <div className={s.container}>
          <div className={s.root}>
            <ViewMessage threadId={threadId} userType={userType} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ViewMessageContainer);
