import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const ChangePasswordType = new ObjectType({
  name: 'ChangePassword',
  fields: {
    id: { type: new NonNull(ID) },
    oldPassword: { type: new NonNull(StringType) },
    newPassword: { type: new NonNull(StringType) },
    confirmPassword: { type: new NonNull(StringType) },
  },
});

export default ChangePasswordType;
