import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingPhotos.css';
import {
  Button,
  Carousel,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

class ListingPhotos extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    size: PropTypes.string,
  };

  static defaultProps = {
    listPhotos: [],
    coverPhoto: 0,
    size: 'x_medium_',
  };

  render() {
    const { id, listPhotos, coverPhoto, size } = this.props;
    const imagepath = `/images/upload/${size}`;

    return (
      <div className={cx(s.listPhotoContainer, 'carousel')}>
        <Carousel
          nextIcon={<FontAwesome.FaAngleRight />}
          prevIcon={<FontAwesome.FaAngleLeft />}
          indicators={false}
          interval={0}
          wrap={false}
          // className={cx('row')}
        >
          {
            listPhotos != null && listPhotos.length && listPhotos.map((item, itemIndex) => {
             
              return (
                <Carousel.Item key={itemIndex}>
                  <div className={cx('col-md-12 col-sm-12 col-xs-12', s.imagePaddingTop, s.imagePadding)}>
                    <a href={`/rooms/${id}`} target={'_blank'}>
                      <div className={s.parent}>
                        <div className={cx(s.children)}>
                          <div className={s.content}>
                            <div
                              className={cx(s.imageContent)}
                              style={{ backgroundImage: `url(${imagepath}${item.name})` }}
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </Carousel.Item>
              )})
          }
        </Carousel>
       
      </div>
    );
  }
}

export default withStyles(s)(ListingPhotos);
