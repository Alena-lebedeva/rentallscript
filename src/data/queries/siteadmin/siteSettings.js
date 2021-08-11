import SiteSettingsType from '../../types/siteadmin/SiteSettingsType';
import { SiteSettings } from '../../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType
} from 'graphql';

const siteSettings = {

  type: new List(SiteSettingsType),

  args: {
    type: { type: StringType },
  },

  async resolve({ request }, { type }) {

    let siteSettingsData;

    if(type != null) {
      // Get Specific Type of Settings Data
      siteSettingsData = await SiteSettings.findAll({
        attributes: [
          'id',
          'title',
          'name',
          'value',
          'type'
        ],
        where: {
          type: type
        }
      });

    } else {
      // Get All Site Settings Data
      siteSettingsData = await SiteSettings.findAll({
        attributes: [
          'id',
          'title',
          'name',
          'value',
          'type'
        ]
      });
    }

    return siteSettingsData;

  },
};

export default siteSettings;
