// General
import React from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!icheck/skins/all.css';

// External Component
import { Checkbox } from 'react-icheck';

class CustomCheckbox extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.any,
  };

  static defaultProps = {
    className: 'icheckbox_minimal-blue'
  };

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillMount() {
    const { checked } = this.props;
    if (checked === true) {
      this.setState({ isChecked: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { checked } = nextProps;
    if (checked === true) {
      this.setState({ isChecked: true });
    }
  }

  handleOnChange() {
    this.setState({ isChecked: !this.state.isChecked });
    return !this.state.isChecked;
  }

  render() {
    const { name, value, onChange, checked, input, className } = this.props;
    const { isChecked } = this.state;

    return (
      <Checkbox
        checkboxClass={className}
        increaseArea="20%"
        checked={isChecked}
        name={name}
        value={value}
        onChange={() => onChange(this.handleOnChange())}
      />
    )
  }
}

export default withStyles(s)(CustomCheckbox);
