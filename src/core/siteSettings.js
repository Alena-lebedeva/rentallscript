import { SiteSettings } from '../data/models';

const getSiteSettings = async () => {

  const data = await SiteSettings.findAll({
    attributes: ['name', 'value'],
    where: { type: "API_settings" }
  })
    .then((resp) => {
      let apiSettingsCollection = {};
      resp.map((item, key) => {
        apiSettingsCollection[item.dataValues.name] = item.dataValues.value;
      });
      return apiSettingsCollection;
    });

  return data;
};

export default getSiteSettings;
