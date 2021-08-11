import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType
} from 'graphql';

const AdminListingType = new ObjectType({
    name: 'AdminListing',
    fields: {
        id: { type: IntType },
        userId: { type: StringType },
        title: { type: StringType },
        description: { type: StringType },
        bedrooms: { type: StringType },
        residenceType: { type: StringType },
        buildingSize: { type: StringType },
        beds: { type: IntType },
        personCapacity: { type: IntType },
        bathrooms: { type: FloatType },
        country: { type: StringType },
        street: { type: StringType },
        buildingName: { type: StringType },
        city: { type: StringType },
        state: { type: StringType },
        zipcode: { type: StringType },
        lat: { type: FloatType },
        lng: { type: FloatType },
        coverPhoto: { type: IntType },
    },
});

export default AdminListingType;