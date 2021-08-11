import BannerType from '../../types/BannerType';
import { Banner } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const updateBannerSettings = {

  type: BannerType,

  args: {
    id: { type: IntType },
    title: { type: StringType },
    content: { type: StringType }
  },

  async resolve({ request }, {
    id,
    title,
    content
  }) {

    if (request.user && request.user.admin == true) {
      let isBannerSettingsUpdated = false;

      // Site Name
      const updateBanner = await Banner.update({
        title,
        content
      }, {
          where: { id }
        })
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isBannerSettingsUpdated = true;
          } else {
            isBannerSettingsUpdated = false;
          }
        });

      if (isBannerSettingsUpdated) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }

    } else {
      return {
        status: 'failed'
      }
    }

  },
};

export default updateBannerSettings;
