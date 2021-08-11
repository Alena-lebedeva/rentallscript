import ImageBannerType from '../../types/ImageBannerType';
import { ImageBanner } from '../../../data/models';

import {
  GraphQLString as StringType
} from 'graphql';

const uploadImageBanner = {

  type: ImageBannerType,

  args: {
    image: { type: StringType },
  },

  async resolve({ request }, { image }) {

    if (request.user && request.user.admin == true) {
      let isImageUploaded = false;

      // Site Name
      const updateImage = await ImageBanner.update({
        image
      },
        {
          where: {
            id: 1
          }
        })
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isImageUploaded = true;
          } else {
            isImageUploaded = false;
          }
        });

      if (isImageUploaded) {
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

export default uploadImageBanner;
