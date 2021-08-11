import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const PopularLocationType = new ObjectType({
    name: 'PopularLocationListing',
    fields: {
        id: { type: IntType },
        location: { type: StringType },
        locationAddress: { type: StringType },
        image: { type: StringType },
        isEnable: { type: StringType },
        createdAt: { type: StringType },
        updatedAt: { type: StringType },
        status: { type: StringType }
    },
});

export default PopularLocationType;