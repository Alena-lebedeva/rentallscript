import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StaticBlock.css';

// Component
import StaticBlockForm from '../../../components/siteadmin/StaticBlockForm/StaticBlockForm';
import Loader from '../../../components/Loader/Loader';

class StaticBlock extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getStaticInfo: PropTypes.object,
    })
  };

  static defaultProps = {
    data: {
      loading: true,
      image: null
    }
  };


  render() {
    const { data: { loading, getStaticInfo }, title } = this.props;
    let settingsCollection = {};

    if (loading) {
      return <Loader type={"text"} />;
    } else {
      getStaticInfo.map((item, key) => {
        if (item.name == 'header') {
          settingsCollection['headerTitle'] = item.title;
          settingsCollection['headerContent'] = item.content;
          settingsCollection['isEnable'] = item.isEnable;
        } else if (item.name == 'block1') {
          settingsCollection['blockTitle1'] = item.title;
          settingsCollection['blockContent1'] = item.content;
          settingsCollection['blockImage1'] = item.image;
        } else {
          settingsCollection['blockTitle2'] = item.title;
          settingsCollection['blockContent2'] = item.content;
          settingsCollection['blockImage2'] = item.image;
        }
      });
      return <StaticBlockForm initialValues={settingsCollection} title={title} />
    }
  }

}

export default compose(
  withStyles(s),
  graphql(gql`
      {
        getStaticInfo {
            title
            content
            name
            image
            isEnable
          }
      }
      `),
)(StaticBlock);
