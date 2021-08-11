import ImageBannerType from '../../types/ImageBannerType';
import { ImageBanner } from '../../../data/models';

import {
  GraphQLString as StringType
} from 'graphql';

const updateImageBanner = {

  type: ImageBannerType,

  args: {
    title: { type: StringType },
    description: { type: StringType },
    buttonLabel: { type: StringType }
  },

  async resolve({ request }, {
    title,
    description,
    buttonLabel
  }) {

    if (request.user && request.user.admin == true) {
      let isImageBanner = false;

      // Site Name
      const updateBanner = await ImageBanner.update({
        title,
        description,
        buttonLabel
      },
        {
          where: {
            id: 1
          }
        })
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isImageBanner = true;
          } else {
            isImageBanner = false;
          }
        });

      if (isImageBanner) {
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
        status: 'notLoggedIn'
      }
    }

  },
};

export default updateImageBanner;
