import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const HomeBannerType = new ObjectType({
    name: 'HomeBanner',
    fields: {
        id: {
            type: IntType
        },
        name: {
            type: StringType
        },
        enable: {
            type: IntType
        },
        status: {
            type: StringType
        }
    }
});

export default HomeBannerType;