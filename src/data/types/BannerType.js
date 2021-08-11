import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const BannerType = new ObjectType({
    name: 'Banner',
    fields: {
        id: {
            type: IntType
        },
        title: {
            type: StringType
        },
        content: {
            type: StringType
        },
        isEnable: {
            type: BooleanType
        },
        status: {
            type: StringType
        }
    }
});

export default BannerType;