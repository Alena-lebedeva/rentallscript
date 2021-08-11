import React from 'react';
import PropTypes from 'prop-types';

import history from '../../core/history';

import { MenuItem } from 'react-bootstrap';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class MenuItemLink extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.any,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(this.props.to);
  };

  render() {
    const { to, children, ...props } = this.props;
    return <MenuItem href={to} {...props} onClick={this.handleClick}>{children}</MenuItem>;
  }
}

export default MenuItemLink;
