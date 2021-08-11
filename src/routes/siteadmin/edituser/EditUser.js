import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditUser.css';
import EditUserForm from '../../../components/siteadmin/EditUserForm';
import Link from '../../../components/Link';

class EditUser extends React.Component {

  static propTypes = {
    profileId: PropTypes.number.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      editUser: PropTypes.object,
    }),
    title: PropTypes.string.isRequired,
  };

  render() {
    const { data: { loading, editUser }, profileId, title } = this.props;
    if (loading) {
      return (
        <div> Loading... </div>
      );
    } else {
      return <EditUserForm initialValues={editUser} title={title} />
    }

  }
}

export default compose(
  withStyles(s),
  graphql(gql`
        query ($profileId:Int!) {
          editUser (profileId:$profileId) {
            profileId
            firstName
            lastName
            dateOfBirth
            gender
            phoneNumber
            preferredLanguage
            preferredCurrency
            location
            info
          }
        }
      `,
    {
      options: (props) => ({
        variables: {
          profileId: props.profileId,
        },
        fetchPolicy: 'network-only'
      })
    }
  ),
)(EditUser);
