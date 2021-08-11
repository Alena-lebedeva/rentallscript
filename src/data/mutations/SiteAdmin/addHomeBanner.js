import HomeBannerType from '../../types/HomeBannerType';
import { HomeBanner } from '../../../data/models';

import {
  GraphQLString as StringType
} from 'graphql';

const addHomeBanner = {

  type: HomeBannerType,

  args: {
    name: { type: StringType },
  },

  async resolve({ request }, { name }) {

    if (request.user && request.user.admin == true) {
      let isImageUploaded = false;
      let updateImage = '';
      const imageCount = await HomeBanner.findAll({})
      // if(imageCount.length < 4) {
      // Site Name
      updateImage = await HomeBanner.create({
        name,
        enable: 1
      })
      // }

      if (updateImage) {
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

export default addHomeBanner;
