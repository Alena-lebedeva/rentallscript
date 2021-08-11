// General
import React from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button } from 'react-bootstrap';
import s from './IncrementBtn.css';
import * as FontAwesome from 'react-icons/lib/fa';

class IncrementBtn extends React.Component {
  static propTypes = {
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    labelSingluar: PropTypes.string,
    labelPlural: PropTypes.string,
    incrementBy: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.any
  };

  static defaultProps = {
    maxValue: 100,
    minValue: 1
  }

  constructor(props) {
    super(props);

    this.state = {
      value: 1
    }

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    const { input } = this.props;
    if (input && input.value) {
      this.setState({
        value: Number(input.value)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { input } = nextProps;
    if (input && input.value) {
      this.setState({
        value: Number(input.value)
      });
    }
  }

  increment = () => {
    const { input, maxValue, incrementBy, onChange } = this.props;
    const { value } = this.state;
    let currentValue = value;

    if (value < maxValue) {
      currentValue = Number(value) + Number(incrementBy)
      this.setState({
        value: currentValue
      });
      onChange(currentValue);
      return input.onChange(Number(currentValue));
    }
  }

  decrement = () => {
    const { input, minValue, incrementBy, onChange } = this.props;
    const { value } = this.state;
    let currentValue = value;

    if (value > minValue) {
      currentValue = Number(value) - Number(incrementBy)
      this.setState({
        value: currentValue
      });
      onChange(currentValue);
      return input.onChange(Number(currentValue));
    }
  }

  render() {
    const { labelSingluar, labelPlural } = this.props;
    const { value } = this.state;

    let label;
    if (value > 1) {
      label = labelPlural;
    } else {
      label = labelSingluar;
    }

    return (
      <div className={s.incrementDecrementButton}>
        <label className={s.incrementDecrementText}> {value} {label}</label>
        <Button className={s.iconButton} onClick={this.decrement}>
          <FontAwesome.FaMinus />
        </Button>
        <Button className={s.iconButton} onClick={this.increment}>
          <FontAwesome.FaPlus />
        </Button>
      </div>
    )
  }
}

export default injectIntl(withStyles(s)(IncrementBtn));
