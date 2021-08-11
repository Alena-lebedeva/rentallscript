import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType
} from 'graphql';

const StaticBlockType = new ObjectType({
  name: 'StaticBlock',
  fields: {
    headerTitle: { type: StringType },
    headerContent: { type: StringType },
    blockTitle1: { type: StringType },
    blockContent1: { type: StringType },
    blockTitle2: { type: StringType },
    blockContent2: { type: StringType },
    blockImage1: { type: StringType },
    blockImage2: { type: StringType },
    status: {
      type: StringType
    },
    title: { type: StringType },
    content: { type: StringType },
    image: { type: StringType },
    name: { type: StringType },
    isEnable: { type: BooleanType },
  },
});

export default StaticBlockType;
