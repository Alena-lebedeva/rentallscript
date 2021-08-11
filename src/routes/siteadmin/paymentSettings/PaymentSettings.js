import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PaymentSettings.css';
import PaymentSettingsForm from '../../../components/siteadmin/PaymentSettingsForm';

class PaymentSettings extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object
  };  

  render () {
    const { title, initialValues } = this.props;

    return (
        <div className={s.root}>
          <div className={s.container}>
            <h1>{title}</h1>
            <PaymentSettingsForm initialValues={initialValues}  />
          </div>
        </div>
    );
  }

}

export default withStyles(s)(PaymentSettings);
