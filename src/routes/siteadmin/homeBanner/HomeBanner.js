import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeBanner.css';

// Component
import HomeBannerForm from '../../../components/siteadmin/HomeBannerForm/HomeBannerForm';
import Loader from '../../../components/Loader/Loader';

class HomeBanner extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getImageBanner: PropTypes.object,
    })
  };

  static defaultProps = {
    data: {
      loading: true,
      image: null
    }
  };


  render() {
    const { data: { loading, getImageBanner }, title } = this.props;
    if (loading) {
      return <Loader type={"text"} />;
    } else {
      return <HomeBannerForm initialValues={getImageBanner} title={title} />
    }
  }

}

export default compose(
  withStyles(s),
  graphql(gql`
        {
            getImageBanner {
                id
                title
                description
                buttonLabel
                image
            }
        }
      `),
)(HomeBanner);
