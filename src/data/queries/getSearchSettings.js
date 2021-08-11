import SearchSettingsType from '../types/SearchSettingsType';
import { SearchSettings } from '../../data/models';

const getSearchSettings = {

  type: SearchSettingsType,

  async resolve({ request }) { 

      return await SearchSettings.findOne();
  },
};

export default getSearchSettings;