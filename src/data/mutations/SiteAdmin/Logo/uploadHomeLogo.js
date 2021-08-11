import SiteSettingsType from '../../../types/siteadmin/SiteSettingsType';
import { SiteSettings } from '../../../models';

import {
  GraphQLString as StringType
} from 'graphql';

const uploadHomeLogo = {

  type: SiteSettingsType,

  args: {
    fileName: { type: StringType },
    filePath: { type: StringType },
  },

  async resolve({ request }, { fileName, filePath }) {

    if (request.user && request.user.admin == true) {
      let removeLogo = await SiteSettings.destroy({
        where: {
          title: 'Home Page Logo'
        }
      });

      let createLogoRecord = await SiteSettings.create({
        title: 'Home Page Logo',
        name: 'homeLogo',
        value: fileName,
        type: 'site_settings'
      });

      if (createLogoRecord) {
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
        status: 'not logged in'
      }
    }

  },
};

export default uploadHomeLogo;
