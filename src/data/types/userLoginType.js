import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';
const UserLogin = new ObjectType({
  name: 'userLogin',
  fields: {
    email: { type: StringType },
    password: { type: StringType },
    userBanStatus: { type: IntType },
    status: { type: StringType },
  },
});
export default UserLogin;
