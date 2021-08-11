import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLString as StringType,
} from 'graphql';

import ShowListingType from './ShowListingType';

import { Listing } from '../models'

const WishListType = new ObjectType({
    name: 'WishList',
    fields: {
        id: { type: IntType },
        wishListGroupId: { type: IntType },
        listId: { type: IntType },
        userId: { type: new NonNull(ID) },
        createdAt: { type: StringType },
        updatedAt: { type: StringType },
        status: { type: StringType },
        listData: {
            type: ShowListingType,
            async resolve(listing) {
                return await Listing.findOne({
                    where: {
                        isPublished: true,
                        id: listing.listId
                    }
                });
            }
        },
        count: {
            type: IntType
        },
    }
});

export default WishListType;