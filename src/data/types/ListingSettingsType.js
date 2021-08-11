import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const ListSettings = new ObjectType({
  name: 'listingSettings',
  description: "Represents listing field values for the frontend",
  fields: {
    id: {type: IntType },
    typeId: { type: IntType },
    itemName: { type: StringType },
    itemDescription: { type: StringType },
    otherItemName: { type: StringType },
    maximum: { type: IntType },
    minimum: { type: IntType },
    startValue: { type: IntType },
    endValue: { type: IntType },
    isEnable: { type: StringType },
  }
});

const ListSettingsType = new ObjectType({
  name: 'listingSettingsTypes',
  description: "Represents listing field types for the frontend",
  fields: {
    id: {type: IntType },
    typeName: { type: StringType },
    typeLabel: { type: StringType },
    step: { type: StringType },
    fieldType: { type: StringType },
    isMultiValue: { type: BooleanType },
    isEnable: { type: StringType },
    status: { type: StringType },
    listSettings: {
      type: new List(ListSettings),
      resolve (listSettingsType) {
        return listSettingsType.getListSettings();
      }
    },
  },
});

export default ListSettingsType;
