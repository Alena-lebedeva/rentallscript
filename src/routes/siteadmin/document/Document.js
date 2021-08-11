import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Document.css';

// Query
import showAllDocumentQuery from './showAllDocumentQuery.graphql';

// Component
import DocumentVerification from '../../../components/siteadmin/DocumentVerification';
import Loader from '../../../components/Loader';

class Document extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllDocument: PropTypes.array,
    })
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };

  render() {
    const { data: { loading, showAllDocument }, title } = this.props;

    if (loading) {
      return <Loader type={"text"} />;
    } else {
      return <DocumentVerification dataList={showAllDocument} title={title} />;
    }
  }

}

export default compose(
  withStyles(s),
  graphql(showAllDocumentQuery, {
    options: (props) => ({
      fetchPolicy: 'network-only'
    })
  }),
)(Document);




