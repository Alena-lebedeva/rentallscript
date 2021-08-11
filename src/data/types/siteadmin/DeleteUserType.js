import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';

const DeleteUserType = new ObjectType({
  name: 'DeleteUser',
  fields: {
    userId: { type: new NonNull(StringType) },
    status: { type: StringType },
  },
});

export default DeleteUserType;
