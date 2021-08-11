import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const FooterBlockType = new ObjectType({
    name: 'FooterBlock',
    fields: {
        id: {
            type: IntType
        },
        title1: {
            type: StringType
        },
        content1: {
            type: StringType
        },
        title2: {
            type: StringType
        },
        content2: {
            type: StringType
        },
        title3: {
            type: StringType
        },
        content3: {
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

export default FooterBlockType;