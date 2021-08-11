import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

import ListSettings from './ListingSettingsType'

const UserBedTypes = new ObjectType({
    name: 'BedTypes',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        bedCount: {
            type: IntType
        },
        bedType: {
            type: IntType
        },
        listsettings: {
            type: ListSettings,
            resolve(userBedType) {
                return userBedType.getListSettings();
            }
        },
    }
});

export default UserBedTypes;