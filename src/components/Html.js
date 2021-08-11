import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import { analytics } from '../config';

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    styles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
    lang: PropTypes.string,
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
    state: null,
    lang: 'en',
  };

  render() {
    const { title, description, styles, scripts, state, lang, children, image } = this.props;
    return (
      <html className="no-js" lang={lang}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="photo" />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
	        <link rel="stylesheet" href="/css/bootstrap.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/react-slick/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/react-slick/slick-theme.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/react-swiper/swiper.css" />
          <link rel="stylesheet" type="text/css" href="/css/react-swiper/swiper.min.css" />
          <link rel="stylesheet" href="/css/rentall-common.css" />
          <link rel="stylesheet" href="/css/min/dropzone.min.css" />
          <link rel="stylesheet" media="print" href="/css/print.css" />
          <link rel="stylesheet" type="text/css" href="/css/quill-snow.css" />

          {styles.map(style =>
            <style
              key={style.id}
              id={style.id}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />,
          )}
         
         
        </head>
        <body>
          <div
            id="app"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: children }}
          />
          {state && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html:
              `window.APP_STATE=${serialize(state, { isJSON: true })}` }}
            />
          )}
          {scripts.map(script => <script key={script} src={script} />)}
          {analytics.google.trackingId &&
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
            />
          }
          {analytics.google.trackingId &&
            <script src="https://www.google-analytics.com/analytics.js" async defer />
          }
          {/* <script id="stripe-js" src="https://js.stripe.com/v3/" async></script> */}
        </body>
      </html>
    );
  }
}

export default Html;
