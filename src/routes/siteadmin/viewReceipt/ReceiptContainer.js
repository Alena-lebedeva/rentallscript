// General
import React from 'react';
import PropTypes from 'prop-types';

// Component
import ViewReceipt from '../../../components/siteadmin/ViewReceipt';

class ReceiptContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string.isRequired
  };

  render() {
    const { data, title } = this.props;
  
    return <ViewReceipt data={data} title={title}  />;
  }
}

export default ReceiptContainer;

