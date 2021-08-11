import ListSettingsType from '../types/ListingSettingsType';

import { ListSettings, ListSettingsTypes } from '../../data/models';

import {
  GraphQLInt as IntType,
} from 'graphql';

const getListingSpecSettings = {

  type: ListSettingsType,

  args: {
    id: { type: IntType }
  },

  async resolve({ request }, { id }) {

    const getResults = await ListSettingsTypes.find({
      where: { id: id }
    });

    if (!getResults) {
      return {
        status: "failed"
      }
    }

    return getResults;

  },

};

export default getListingSpecSettings;
