import ImageBannerType from '../types/ImageBannerType';
import { ImageBanner } from '../models';

const getImageBanner = {

  type: ImageBannerType,

  async resolve({ request }) {
    return await ImageBanner.findOne();
  }
};

export default getImageBanner;
