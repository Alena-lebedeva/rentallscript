import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType
} from 'graphql';

const AdminUserLoginType = new ObjectType({
  name: 'adminUserLogin',
  fields: {
    id: { type: StringType },
    email: { type: StringType },
    password: { type: StringType },
    isSuperAdmin: { type: BooleanType },
    status: { type: StringType },
  },
});

export default AdminUserLoginType;
