import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FooterBlock.css';

// Component
import FooterBlockForm from '../../../components/siteadmin/FooterBlockForm';
import Loader from '../../../components/Loader';

class FooterBlock extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getFooterSettting: PropTypes.object,
    })
  };

  static defaultProps = {
    data: {
      loading: true,
      image: null
    }
  };


  render() {
    const { data: { loading, getFooterSetting }, title } = this.props;
    if (loading) {
      return <Loader type={"text"} />;
    } else {
      return <FooterBlockForm initialValues={getFooterSetting} title={title} />
    }
  }

}

export default compose(
  withStyles(s),
  graphql(gql`
        {
            getFooterSetting {
                id
                title1
                content1
                title2
                content2
                title3
                content3
            }
        }
      `),
)(FooterBlock);
