import WishListGroupType from '../../types/WishListGroupType';
import { WishListGroup, UserProfile } from '../../models';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

const getWishListGroup = {

    type: WishListGroupType,

    args: {
        profileId: { type: new NonNull(IntType) },
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { id, profileId }) {
        if (profileId) {
            const userData = await UserProfile.find({
                attributes: [
                    'userId',
                ],
                where: {
                    profileId
                }
            });

            return await WishListGroup.findOne({
                where: {
                    userId: userData.userId,
                    id
                }
            });

        } else {
            return {
                status: 'noUserId'
            }
        }
    }
}

export default getWishListGroup;

/*

query getWishListGroup ($profileId: Int!, $id: Int!){
    getWishListGroup(profileId: $profileId, id: $id){
        id
        name
        userId
        isPublic
        updatedAt
        wishListCount
    	wishLists {
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
}

*/