import {
    GraphQLList as List,
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
} from 'graphql';

import WishListGroupType from './WishListGroupType';

const AllWishListGroupType = new ObjectType({
    name: 'AllWishListGroup',
    fields: {
        wishListGroupData: { type: new List(WishListGroupType) },
        count: { type: IntType },
        status: { type: StringType }
    }
});

export default AllWishListGroupType;
