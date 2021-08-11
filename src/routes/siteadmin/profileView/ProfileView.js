import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProfileView.css';

// Query 
import profileViewDetail from './profileView.graphql';

// Component
import ProfileVerifiedView from '../../../components/siteadmin/ProfileVerifiedView';
import Loader from '../../../components/Loader';

class ProfileView extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            showUserProfile: PropTypes.array,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading, showUserProfile }, title, profileId } = this.props;
        if (loading) {
            return <Loader type={"text"} />;
        } else {
            return <ProfileVerifiedView 
                data={showUserProfile} 
                title={title} 
                profileId={profileId} 
            />;
        }
    }

}

export default compose(
    withStyles(s),
    graphql(profileViewDetail,    
              {
            options: (props) => ({
                variables: {
                    profileId: props.profileId,
                },
                fetchPolicy: 'network-only',
                ssr: false
            })
        }),    
)(ProfileView);
