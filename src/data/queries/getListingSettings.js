import ListSettingsType from '../types/ListingSettingsType';

import { ListSettingsTypes } from '../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';

const getListingSettings = {

  type: new List(ListSettingsType),

  args: {
    step: { type: StringType }
  },

  async resolve({ request }, { step }) {
    //if(request.user) {
    let where;

    if (step != undefined) {
      where = { where: { step: step } };
    }

    where = Object.assign({}, where, { isEnable: true });

    const getResults = await ListSettingsTypes.findAll({
      ...where
    });

    if (!getResults) {
      return {
        status: "failed"
      }
    }

    return getResults;

    /*} else {
          return {
            status: "failed"
          }
      }*/
  },

};

export default getListingSettings;
