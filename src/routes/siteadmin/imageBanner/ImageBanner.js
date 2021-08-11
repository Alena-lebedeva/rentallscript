import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageBanner.css';

// Component
import ImageBannerForm from '../../../components/siteadmin/ImageBannerForm';
import Loader from '../../../components/Loader';

class ImageBanner extends React.Component {

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
      return <ImageBannerForm initialValues={getImageBanner} image={getImageBanner.image} title={title} />
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
)(ImageBanner);
