import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UserRegister = new ObjectType({
  name: 'userRegister',
  fields: {
    firstName: { type: StringType },
    lastName: { type: StringType },
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
    dateOfBirth: { type: StringType },
    status: {type: StringType},
    emailToken: {type: StringType},
  },
});

export default UserRegister;
