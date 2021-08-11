import WishListGroupType from '../../types/WishListGroupType';
import { WishListGroup, WishList } from '../../models';

import {
    GraphQLInt as IntType,
} from 'graphql';

const DeleteWishListGroup = {

    type: WishListGroupType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request, response }, { id }) {

        // Check whether user is logged in
        if (request.user || (request.user && request.user.admin)) {
            const userId = request.user.id;
            let isWishGroupDeleted = false, isWishListsDeleted = false;
            const isListAvailable = await WishListGroup.count({
                where: {
                    userId,
                    id
                }
            });

            if (isListAvailable && isListAvailable > 0) {
                // Delete Wish List Group
                const deleteGroup = await WishListGroup.destroy({
                    where: {
                        userId,
                        id
                    }
                })
                    .then(function (instance) {
                        // Check if any rows are affected
                        if (instance > 0) {
                            isWishGroupDeleted = true;
                        }
                    });

                // Delete Wish Lists
                const deleteLists = await WishList.destroy({
                    where: {
                        userId,
                        wishListGroupId: id
                    }
                })
                    .then(function (instance) {
                        isWishListsDeleted = true;
                    });

                if (isWishGroupDeleted === true && isWishListsDeleted === true) {
                    return {
                        status: "success",
                    };
                } else {
                    return {
                        status: "failed",
                    };
                }
            } else {
                return {
                    status: "notFound",
                };
            }
        } else {
            return {
                status: "notLoggedIn"
            };
        }

    },
};

export default DeleteWishListGroup;

/*

mutation DeleteWishListGroup(
    $id: Int!,
){
    DeleteWishListGroup(
        id: $id
    ) {
        status
    }
}

*/
