import AllWishListGroupType from '../../types/AllWishListGroupType';
import { WishListGroup, UserProfile } from '../../models';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

const getAllWishListGroup = {

    type: AllWishListGroupType,

    args: {
        profileId: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { profileId }) {
        if (profileId) {
            const userData = await UserProfile.find({
                attributes: [
                    'userId',
                ],
                where: {
                    profileId
                }
            });

            const count = await WishListGroup.count({
                where: {
                    userId: userData.userId
                }
            });

            const wishListGroupData = await WishListGroup.findAll({
                where: {
                    userId: userData.userId
                }
            });

            return {
                wishListGroupData,
                count,
                status: 'success'
            }

        } else {
            return {
                status: 'noUserId'
            }
        }
    }
}

export default getAllWishListGroup;

/*

query getAllWishListGroup ($profileId: Int!){
    getAllWishListGroup(profileId: $profileId){
    	wishListGroupData {
        id
        name
        userId
        isPublic
        updatedAt
        wishListCount
        wishListCover {
          id
          listId
          listData {
            id
            title
            personCapacity
            beds
            bookingType
            coverPhoto
            reviewsCount,
            reviewsStarRating,
            listPhotos {
              id
              name
              type
              status
            }
            listingData {
              basePrice
              currency
            }
            settingsData {
              listsettings {
                id
                itemName
              }
            }
          }
        }
  		}
      count
      status
    }
}

*/