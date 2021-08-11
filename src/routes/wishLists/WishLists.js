import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WishLists.css';
import { graphql, gql, compose } from 'react-apollo';

// Components
import Loader from '../../components/Loader';
import WishLists from '../../components/WishLists';
import NotFound from '../../routes/notFound/NotFound';
import EditWishListGroup from '../../components/WishLists/EditWishListGroup';

class WishListsContainer extends React.Component {

  static propTypes = {
    profileId: PropTypes.number,
    wishListId: PropTypes.number
  };

  render() {
    const { profileId, wishListId } = this.props;
    
    return (
        <div className={s.container}>
            {
              wishListId && profileId && <div className={s.mainSection}>
              <EditWishListGroup profileId={profileId} wishListId={wishListId} />
              </div>
            }
            {
              !wishListId && profileId && <div className={s.mainSection}>
                <WishLists profileId={profileId} />
              </div>
            }
            {
              !wishListId && !profileId && <div className={s.mainSection}>
                <NotFound />
              </div>   
            }
        </div>
    );
  }
}

export default withStyles(s)(WishListsContainer);
