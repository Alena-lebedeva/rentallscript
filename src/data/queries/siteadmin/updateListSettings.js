import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';
import { ListSettings } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

const updateListSettings = {

  type: ListSettingsType,

  args: {
    id: { type: IntType },
    typeId: { type: IntType },
    itemName: { type: StringType },
    itemDescription: { type: StringType },
    otherItemName: { type: StringType },
    maximum: { type: IntType },
    minimum: { type: IntType },
    startValue: { type: IntType },
    endValue: { type: IntType },
    isEnable: { type: StringType },
  },

  async resolve({ request }, {
    id,
    typeId,
    itemName,
    itemDescription,
    otherItemName,
    maximum,
    minimum,
    startValue,
    endValue,
    isEnable
  }) {

    if (request.user && request.user.admin == true) {

      let isListSettingsUpdated = false;

      const modifyListSettings = await ListSettings.update(
        {
          itemName: itemName,
          itemDescription: itemDescription,
          otherItemName: otherItemName,
          maximum: maximum,
          minimum: minimum,
          startValue: startValue,
          endValue: endValue,
          isEnable: isEnable
        },
        {
          where: {
            id: id,
            typeId: typeId
          }
        }
      )
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListSettingsUpdated = true;
          }
        });

      if (isListSettingsUpdated) {
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

export default updateListSettings;
