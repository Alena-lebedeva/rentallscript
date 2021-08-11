import WishListGroupType from '../../types/WishListGroupType';
import { WishList } from '../../models';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const updateListStatus = {

    type: WishListGroupType,

    args: {
        listId: { type: new NonNull(IntType) },
        action: { type: new NonNull(StringType) }
    },

    async resolve({ request }, { listId, action }) {

        let publishStatus;

        if (listId && action) {
            if (action === 'unPublish') {
                publishStatus = false;
            } else {
                publishStatus = true;
            }
        }

        let updateListingStatus = await WishList.update({
            isListActive: publishStatus
        }, {
                where: {
                    listId
                }
            });

        if (updateListingStatus) {
            return {
                status: 200
            }
        } else {
            return {
                status: 400
            }
        }
    }
}

export default updateListStatus;