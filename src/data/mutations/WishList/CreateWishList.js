import WishListType from '../../types/WishListType';
import { WishList, Listing } from '../../models';

import {
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const CreateWishList = {

    type: WishListType,

    args: {
        listId: { type: IntType },
        wishListGroupId: { type: IntType },
        eventKey: { type: BooleanType }
    },

    async resolve({ request, response }, { listId, wishListGroupId, eventKey }) {

        // Check whether user is logged in
        if (request.user || request.user.admin) {
            const userId = request.user.id;

            const isListOwner = await Listing.count({
                where: {
                    userId,
                    id: listId
                }
            });

            if (isListOwner) {
                return {
                    status: "listOwner"
                };
            } else {
                // Wish Lists
                if (eventKey === true) {
                    let updateWishList = await WishList.create({
                        listId,
                        userId,
                        wishListGroupId,
                        isListActive: true
                    });
                } else {
                    const removeWishList = await WishList.destroy({
                        where: {
                            listId,
                            userId,
                            wishListGroupId
                        }
                    });
                }

                return {
                    status: "success"
                };
            }
        } else {
            return {
                status: "notLoggedIn"
            };
        }

    },
};

export default CreateWishList;

/*

mutation CreateWishList(
    $listId: Int!,
    $wishListGroupId:Int,
    $eventKey:Boolean,
){
    CreateWishList(
        listId: $listId,
        wishListGroupId: $wishListGroupId,
        eventKey: $eventKey,
    ) {
        status
    }
}

*/
