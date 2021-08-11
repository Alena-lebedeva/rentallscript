import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { FormattedMessage } from 'react-intl';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';


import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './FaqSection.css';

// Locale
import messages from '../../../locale/messages';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };


  render() {
    const { refer, siteName, data } = this.props;
    

    return (
      <Grid className="faq-Collaps">
        <Row className={s.faqsection}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.seperator, s.boxseperator)}></div>
            <div className={s.mainhedding}>
              <h1><FormattedMessage {...messages.faqtitle} /></h1>

              <Col xs={12} sm={6} md={6} lg={6} className={s.faqcolumn}>

                {data && data.faqTitle1 && <Collapsible triggerOpenedClassName={s.questionOpen} triggerClassName={s.question} transitionTime="200" trigger={data && data.faqTitle1}>
                  <p>
                    {data && data.faqContent1}
                  </p>
                </Collapsible>}

                {data && data.faqTitle3 && <Collapsible triggerOpenedClassName={s.questionOpen} triggerClassName={s.question} transitionTime="200" trigger={data && data.faqTitle3}>
                  <p>
                    {data && data.faqContent3}
                  </p>
                </Collapsible>}

                {data && data.faqTitle5 && <Collapsible triggerOpenedClassName={s.questionOpen} triggerClassName={s.question} transitionTime="200" trigger={data && data.faqTitle5}>
                  <p>
                    {data && data.faqContent5}
                  </p>
                </Collapsible>}

                {data && data.faqTitle7 && <Collapsible triggerOpenedClassName={s.questionOpen} triggerClassName={s.question} transitionTime="200" trigger={data && data.faqTitle7}>
                  <p>
                    {data && data.faqContent7}
                  </p>
                </Collapsible>}

              </Col>

              <Col xs={12} sm={6} md={6} lg={6} className={s.faqcolumn}>

                {data && data.faqTitle2 && <Collapsible triggerOpenedClassName={s.questionOpen} triggerClassName={s.question} transitionTime="200" trigger={data && data.faqTitle2}>
                  <p>
                    {data && data.faqContent2}
                  </p>
                </Collapsible>}

                {data && data.faqTitle4 && <Collapsible triggerOpenedClassName={s.questionOpen} triggerClassName={s.question} transitionTime="200" trigger={data && data.faqTitle4}>
                  <p>
                    {data && data.faqContent4}
                  </p>
                </Collapsible>}

                {data && data.faqTitle6 && <Collapsible triggerOpenedClassName={s.questionOpen} triggerClassName={s.question} transitionTime="200" trigger={data && data.faqTitle6}>
                  <p>
                    {data && data.faqContent6}
                  </p>
                </Collapsible>}

                {data && data.faqTitle8 && <Collapsible triggerOpenedClassName={s.questionOpen} triggerClassName={s.question} transitionTime="200" trigger={data && data.faqTitle8}>
                  <p>
                    {data && data.faqContent8}
                  </p>
                </Collapsible>}

              </Col>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName

});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));
