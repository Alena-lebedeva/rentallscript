import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const ImageBannerType = new ObjectType({
    name: 'ImageBanner',
    fields: {
        id: {
            type: IntType
        },
        title: {
            type: StringType
        },
        description: {
            type: StringType
        },
        buttonLabel: {
            type: StringType
        },
        image: {
            type: StringType
        },
        status: {
            type: StringType
        }
    }
});

export default ImageBannerType;