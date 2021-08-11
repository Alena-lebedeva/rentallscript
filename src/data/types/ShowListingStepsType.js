import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

// Models
import { Listing } from '../models';
import ShowListingType from './ShowListingType';

const ShowListingStepsType = new ObjectType({
  name: 'ShowListingSteps',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    step1: { type: StringType },
    step2: { type: StringType },
    step3: { type: StringType },
    step4: { type: StringType },
    listing: {
      type: ShowListingType,
      resolve(userListingSteps) {
        return Listing.findOne({ where: { id: userListingSteps.listId } });
      }
    },
    currentStep: { type: IntType },
    status: { type: StringType },
  },
});

export default ShowListingStepsType;
