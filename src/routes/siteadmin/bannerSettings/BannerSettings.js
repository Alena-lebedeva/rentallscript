import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BannerSettings.css';

// Component
import BannerSettingsForm from '../../../components/siteadmin/BannerSettingsForm';
import Loader from '../../../components/Loader';

class BannerSettings extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getBanner: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };

  render() {
    const { data: { loading, getBanner }, title } = this.props;

    if (loading) {
      return <Loader type={"text"} />;
    } else {
      return <BannerSettingsForm initialValues={getBanner} title={title} />
    }
  }
}

export default compose(
  withStyles(s),
  graphql(gql`
        {
          getBanner {
            id
            title
            content
          }
        }
      `
  ),
)(BannerSettings);
