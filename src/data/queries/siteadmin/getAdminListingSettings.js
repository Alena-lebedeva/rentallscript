import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';
import { ListSettingsTypes } from '../../../data/models';

import {
  GraphQLInt as IntType,
} from 'graphql';

const getAdminListingSettings = {

  type: ListSettingsType,

  args: {
    typeId: { type: IntType },
  },

  async resolve({ request }, { typeId }) {
    if (request.user && request.user.admin == true) {

      const getResults = await ListSettingsTypes.find({
        where: {
          id: typeId
        }
      });

      if (!getResults) {
        return {
          status: "failed"
        }
      }

      return getResults;

    } else {
      return {
        status: "failed"
      }
    }
  },

};

export default getAdminListingSettings;
