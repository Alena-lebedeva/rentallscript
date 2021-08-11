import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

import { encode } from '../../helpers/queryEncryption';

const UserEncryptType = new ObjectType({
    name: 'UserEncrypt',
    fields: {
        id: { type: new NonNull(ID) },
        email: {
            type: StringType,
            resolve(user) {
                return encode(user.email)
            }
        },
        type: { type: StringType },
        status: { type: StringType },
        userBanStatus: { type: IntType },
        userStatus: { type: BooleanType },
        userExistStatus: { type: BooleanType }
    },
});
export default UserEncryptType;
