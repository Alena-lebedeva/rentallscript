import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';
import submit from './submit';
import { getHomeBannerImages } from '../../../actions/getHomeBannerImages';

// Style
import {
  Row,
  FormGroup,
  Col,
  ControlLabel,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeBannerForm.css';

// Component
import DropZone from './DropZone';
import { deleteHomeBanner } from '../../../actions/siteadmin/deleteHomeBanner';

class HomeBannerForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    bannerUploaderLoading: PropTypes.bool
  };

  render() {

    const { error, handleSubmit, title, image, bannerUploaderLoading, homeBannerImages, deleteHomeBanner } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col componentClass={ControlLabel} xs={12} sm={12} md={12} lg={12}>
                      <DropZone data={image} />
                    </Col>
                  </Row>
                </FormGroup>
                <div className={cx('row')}>
                  {
                    homeBannerImages && homeBannerImages.data.length > 0 && homeBannerImages.data.map((item, key) => {
                      return (
                        <div key={key} className={cx('col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center', s.marginBottom20)}>
                          <div className={s.listPhotoCover}>
                            <div className={s.listPhotoMedia}>
                              <img className={s.imgResponsive} src={'/images/home/' + item.name} className={s.imageWidth} height="172" />
                            </div>
                          </div>
                          <a href="javascript:void(0);" onClick={() => deleteHomeBanner(item.id, item.name)}>
                            Remove file
                          </a>
                        </div>
                      );

                    })
                  }
                </div>
              </form>
            </Panel>
          </Col>
        </div>
      </div>
    );
  }

}

HomeBannerForm = reduxForm({
  form: 'HomeBannerForm', // a unique name for this form
  // validate
})(HomeBannerForm);

const mapState = (state) => ({
  bannerUploaderLoading: state.siteSettings.bannerUploaderLoading,
  homeBannerImages: state.homeBannerImages
});

const mapDispatch = {
  getHomeBannerImages,
  deleteHomeBanner
};

export default withStyles(s)(connect(mapState, mapDispatch)(HomeBannerForm));
