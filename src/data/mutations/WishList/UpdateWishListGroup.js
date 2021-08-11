import WishListGroupType from '../../types/WishListGroupType';
import { WishListGroup } from '../../models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const UpdateWishListGroup = {

    type: WishListGroupType,

    args: {
        name: { type: StringType },
        isPublic: { type: IntType },
        id: { type: IntType }
    },

    async resolve({ request, response }, { name, isPublic, id }) {

        // Check whether user is logged in
        if (request.user || request.user.admin) {
                const userId = request.user.id;
                const updateWishListGroup = await WishListGroup.update({
                    name,
                    isPublic
                }, {
                        where: {
                            id
                        }
                });
                
                if (updateWishListGroup) {
                    return {
                        status: "success"
                    };
                } else {
                    return {
                        status: "failed"
                    };
                }
        } else {
            return {
                status: "NotLoggedIn"
            };
        }

    },
};

export default UpdateWishListGroup;

/*

mutation UpdateWishListGroup(
    $name: String!,
    $isPublic: Int,
    $id: Int!
){
    UpdateWishListGroup(
        name: $name,
        isPublic: $isPublic,
        id: $id
    ) {
        status
    }
}

*/
