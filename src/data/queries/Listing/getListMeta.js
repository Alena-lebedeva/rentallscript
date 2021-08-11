// GrpahQL
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ShowListingType from '../../types/ShowListingType';
import { Listing } from '../../models';

const getListMeta = {

    type: ShowListingType,

    args: {
        listId: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { listId }) {
        return await Listing.findOne({
            where: { id: listId }
        });
    }
};

export default getListMeta;

/**
query GetListMeta($listId: Int!) {
  getListMeta(listId: $listId) {
    id
    title
    description
    status
  }
}
 */