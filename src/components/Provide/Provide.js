import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import IntlProvider from './IntlProvider';

function Provide({ store, children }) {
  return (
    <Provider store={store}>
      <IntlProvider>
        {children}
      </IntlProvider>
    </Provider>
  );
}

Provide.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.any.isRequired,
    dispatch: PropTypes.any.isRequired,
    getState: PropTypes.any.isRequired,
  }).isRequired,
  children: PropTypes.element.isRequired,
};

export default Provide;
