import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import PayoutBillingDetails from './PayoutBillingDetails';
import PayoutConfirm from './PayoutConfirm';
import PayoutMethods from './PayoutMethods';

class PayoutForm extends Component {
    static propTypes = {
      initialValues: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      this.state ={
        page: 1
      };
      this.nextPage = this.nextPage.bind(this)
      this.previousPage = this.previousPage.bind(this)
    }

    nextPage() {
      this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
      this.setState({ page: this.state.page - 1 })
    }

    render() {
        const { page } = this.state;
        const { initialValues } = this.props;

        return(
          <div>
            {
              page === 1 && <PayoutBillingDetails 
                onSubmit={this.nextPage}
                initialValues={initialValues}
              />
            }
            {
              page === 2 && <PayoutMethods 
                previousPage={this.previousPage} 
                onSubmit={this.nextPage} 
                initialValues={initialValues}
              />
            }
            {
              page === 3 && <PayoutConfirm 
                previousPage={this.previousPage} 
                onSubmit={this.nextPage} 
                initialValues={initialValues}
              />
            }
          </div>
        );
    }
}

export default PayoutForm;