import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NewsBox.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import Link from '../../Link';

class NewsBox extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      buttonLabel: PropTypes.string,
      image: PropTypes.string,
    }),
  };

  render() {
    const { data: { title, description, buttonLabel, image } } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.table)}>
              <Row>
                <Col lg={6} md={6} sm={6} xs={12}>
                  <div className={cx(s.tableCell, s.imageColumn)}>
                    <img
                      src={"/images/banner/x_" + image}
                      className={cx('img-responsive', s.imgShadow)}
                    />
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6} xs={12}>
                  <div className={cx(s.tableCell, s.textColumn, s.desktopView)}>
                    <h3 className={s.title}>{title}</h3>
                    <p className={s.caption}>{description}</p>
                    <Link
                      to={"/whyhost"}
                      className={cx(s.btn, s.btnPrimary)}
                    >
                      {buttonLabel}
                    </Link>
                  </div>
                </Col>
              </Row>
              <div className={cx(s.tableCell, s.textColumn, s.mobileView)}>
                <h3 className={s.title}>{title}</h3>
                <p className={s.caption}>{description}</p>
                <Link
                  to={"/whyhost"}
                  className={cx(s.btn, s.btnPrimary)}
                >
                  {buttonLabel}
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(NewsBox);
