// General
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PasswordVerification.css';

// Components
import ChangePasswordForm from '../../components/ForgotPassword/ChangePasswordForm';
import Loader from '../../components/Loader';
import NotFound from '../notFound/NotFound';

class PasswordVerification extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      forgotPasswordVerification: PropTypes.object
    })
  };

  render() {
    const { email, token, title } = this.props;
    const { data, data: { loading, forgotPasswordVerification } } = this.props;
    let initialValues = { email };
    if (loading) {
      return <Loader type={"text"} />
    }
    if (data && data.forgotPasswordVerification && data.forgotPasswordVerification.status === '200') {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <ChangePasswordForm initialValues={initialValues} />
          </div>
        </div>
      );
    } else {
      return <NotFound title={title} />
    }

  }
}

export default compose(
  withStyles(s),
  graphql(gql`
      query forgotPasswordVerification($email: String!, $token: String!) {
        forgotPasswordVerification (email: $email, token: $token) {
            id
            email
            token
            userId
            status
        }
      }`,
    {
      options: (props) => ({
        variables: {
          email: props.email,
          token: props.token,
        }
      })
    }
  )
)(PasswordVerification);
