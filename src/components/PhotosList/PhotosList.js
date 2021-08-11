import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Action
import { removeListPhotos } from '../../actions/manageListPhotos';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// Locale
import messages from '../../locale/messages';

import s from './PhotosList.css';
class PhotosList extends Component {

  static propTypes = {
    removeListPhotos: PropTypes.any.isRequired,
    listId: PropTypes.number.isRequired,
    listPhotos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      listId: PropTypes.number.isRequired
    }))
  };

  static defaultProps = {
    listPhotos: []
  };

  render() {
    const { removeListPhotos, listId, listPhotos } = this.props;
    return (
      <div className={cx('row')}>
        {
          listPhotos && listPhotos.map((item, key) => {
            return (
              <div key={key} className={cx('col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center')}>
                <div className={s.listPhotoCover}>
                  <div className={s.listPhotoMedia}>
                    <img className={s.imgResponsive} src={'/images/upload/x_medium_' + item.name} />
                  </div>
                </div>
                <a href="javascript:void(0);" onClick={() => removeListPhotos(item.listId, item.name, true)}>
                  <FormattedMessage {...messages.removeFile} />
                </a>
              </div>
            );

          })
        }
      </div>
    );
  }

}

const mapState = (state) => ({
  listPhotos: state.location.listPhotos
});

const mapDispatch = {
  removeListPhotos,
};

export default withStyles(s)(connect(mapState, mapDispatch)(PhotosList));
