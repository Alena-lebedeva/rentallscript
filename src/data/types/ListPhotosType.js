import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType
} from 'graphql';

const ListPhotosType = new ObjectType({
  name: 'ListPhotos',
  fields: {
    id: { type: new NonNull(IntType) },
    listId: { type: new NonNull(IntType) },
    name: { type: StringType },
    type: { type: StringType },
    isCover: { type: IntType },
    photosCount: { type: IntType },
    status: { type: StringType },
    iscoverPhotoDeleted: { type: BooleanType },
  },
});

export default ListPhotosType;
