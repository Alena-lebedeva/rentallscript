import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contact.css';
import ContactForm from '../../components/ContactForm';

class Contact extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {

    return (
      <div className={s.root}>
        <div className={s.container}>
          <ContactForm />
          {/* <h1>Contact Page</h1>
          <p>Coming soon</p> */}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
