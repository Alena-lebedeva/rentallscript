import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
} from 'graphql';

const UserLogout = new ObjectType({
  name: 'userLogout',
  fields: {
    status: {type: StringType},
  },
});

export default UserLogout;
