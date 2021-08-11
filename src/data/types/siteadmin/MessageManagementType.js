import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const ProfileType = new ObjectType({
    name: "ProfileType",
    fields: () => ({
        profileId: { type: IntType },
        firstName: { type: StringType },
        lastName: { type: StringType },
        gender: { type: StringType },
        dateOfBirth: { type: StringType },
        phoneNumber: { type: StringType },
        preferredLanguage: { type: StringType },
        preferredCurrency: { type: StringType },
        location: { type: StringType },
        info: { type: StringType },
        createdAt: { type: StringType }
    })
});

const Listing = new ObjectType({
    name: "Listing",
    fields: () => ({
        title: { type: StringType },
        description: { type: StringType },
        createdAt: { type: StringType }
    })
});

const MessageManagementType = new ObjectType({
    name: 'MessageManagement',

    fields: {
        id: { type: new NonNull(ID) },
        profile: {
            type: ProfileType
        },
        listing: {
            type: Listing
        },
        status: { type: StringType }
    },
});
export default MessageManagementType;
