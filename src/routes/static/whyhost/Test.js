import React, { Component } from 'react';
import Image from './whyhostbanner.jpg';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Test.css';
import {
    Button,
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// History
import history from '../../../core/history';


// Internal Components
// // import Link from '../../../Link';
// import Link from '../../../components/Link';

import HelpPage from '../../../components/HelpPage';

// ES6 Imports
import Scroll from 'react-scroll'; // Imports all Mixins

// Or Access Link,Element,etc as follows
let Link = Scroll.Link;
let Element = Scroll.Element;

class Test extends Component {
    handleClick() {
        history.push('/become-a-host?mode=new');
    }

    render() {
        return (
            <div>
                <div className={s.TopBannerHeader}>
                    <div
                        className={s.topImageBanner}
                        style={{ backgroundImage: `url(${Image})` }}
                    />
                    <div className={s.bannerText}>
                        <Col
                            xs={12} sm={8} md={8} lg={8}
                            className={s.noPadding}
                        >
                            <h1 className={s.bannerTitle}>
                                <FormattedMessage {...messages.topBannerTitle} />
                            </h1>
                            <div>
                                <Button
                                    className={cx(s.button)}
                                    onClick={this.handleClick}
                                >
                                    <FormattedMessage {...messages.becomeAHost} />
                                </Button>
                                <Link
                                    className={cx(s.button, s.btnPrimaryBorder, s.linkButton, s.btnRight)}
                                    activeClass={s.active}
                                    to="test1"
                                    spy={true}
                                    smooth={true}
                                >
                                    <FormattedMessage {...messages.learnMore} />
                                </Link>
                            </div>
                        </Col>
                    </div>
                </div>
                <Element name="test1" className="element">
                    <Row className={cx(s.landingContainer)}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <HelpPage />
                        </Col>
                    </Row>
                </Element>
            </div>
        );
    }
}

export default withStyles(s)(Test);