import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const CountryType = new ObjectType({
    name: 'Country',
    fields: {
        id: {
            type: IntType
        },
        countryCode: {
            type: StringType
        },
        countryName: {
            type: StringType
        },
        isEnable: {
            type: BooleanType
        },
        status: {
            type: StringType
        },
        dialCode: {
            type: StringType
        },
    }
});

export default CountryType;