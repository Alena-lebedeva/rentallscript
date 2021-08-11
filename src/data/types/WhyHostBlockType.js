import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType
  } from 'graphql';
  
  const WhyHostBlockType = new ObjectType({
    name: 'WhyHost',
    fields: {
      id: { type: StringType },
      title: { type: StringType },
      name: { type: StringType },
      value: { type: StringType },
      status: { type: StringType }
    },
  });
  
  export default WhyHostBlockType;
  