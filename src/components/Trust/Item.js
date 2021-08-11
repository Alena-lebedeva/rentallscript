import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Image } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Trust.css';
import Loader from '../Loader';
import mail from './icons/gmail.png';
import document from './icons/correct.png';
import email from './icons/email.png';
import facebook from './icons/facebook.png';

class Item extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        handleClick: PropTypes.any,
        isAction: PropTypes.bool,
        buttonLabel: PropTypes.string,
        url: PropTypes.string,
        isLink: PropTypes.bool,
        show: PropTypes.bool,
    };
    render() {
        const { title, content, handleClick, isAction, buttonLabel, url, isLink, show, isImage } = this.props;
        const { isEmailConfirmed, name } = this.props;
        let bgImage;
        if (name == 'email') {
            bgImage = email
        } else if (name == 'facebook') {
            bgImage = facebook
        } else if (name == 'google') {
            bgImage = mail
        } else if (name == 'document') {
            bgImage = document
        }
        return (
            <li className={cx(s.space4, "clearfix", s.background)}>

                <Row className={s.displayFlex}>
                    <Col xs={12} sm={2} md={2} lg={2} className={s.inlineFlex}>
                        <Image src={bgImage} className={s.iconImages} />

                    </Col>
                    <Col xs={12} sm={5} md={5} lg={5} className={s.responsiveCenter}>
                        <h4>{title}</h4>
                        <p className={s.description}>{content}</p>
                    </Col>
                    {
                        isAction && isLink && <Col xs={12} sm={4} md={4} lg={4} className={s.responsiveFlex}>
                            <a
                                className={cx(s.button, s.btnPrimaryBorder, s.btnlarge)}
                                href={url}
                            >
                                {buttonLabel}
                            </a>
                        </Col>
                    }

                    {
                        isAction && !isLink && <Col xs={12} sm={4} md={4} lg={4} className={'responsiveCenterFlex'} >
                            <Loader
                                type={"button"}
                                className={cx(s.button, s.btnPrimaryBorder, s.btnlarge)}
                                handleClick={handleClick}
                                show={show}
                                label={buttonLabel}
                                spinnerColor={"#ff5a5f"}
                            />
                        </Col>
                    }
                    {
                        isImage && <Col xs={12} sm={4} md={4} lg={4} className={'responsiveCenterFlex'}>

                            <Loader
                                type={"button"}
                                className={cx(s.button, s.btnverified, s.btnlarge)}
                                show={show}
                                label={"Verified"}
                                disabled
                            />
                        </Col>

                    }
                </Row>
            </li>

        )
    }
}
export default withStyles(s)(Item);
