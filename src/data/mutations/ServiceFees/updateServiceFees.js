// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType,
} from 'graphql';

import ServiceFeesType from '../../types/ServiceFeesType';

// Sequelize models
import { ServiceFees } from '../../models';

const updateServiceFees = {

  type: ServiceFeesType,

  args: {
    guestType: { type: new NonNull(StringType) },
    guestValue: { type: new NonNull(FloatType) },
    hostType: { type: new NonNull(StringType) },
    hostValue: { type: new NonNull(FloatType) },
    currency: { type: StringType },
  },

  async resolve({ request, response }, {
    guestType,
    guestValue,
    hostType,
    hostValue,
    currency
  }) {

    // Check if user already logged in
    if (request.user && request.user.admin) {

      let removeExistingData = await ServiceFees.truncate();

      return await ServiceFees.create({
        guestType,
        guestValue,
        hostType,
        hostValue,
        currency
      });

    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default updateServiceFees;


/**
mutation updateServiceFees(
  $guestType: String!,
  $guestValue: Float!,
  $hostType: String!,
  $hostValue: Float!,
  $currency: String,
){
    updateServiceFees(
      guestType: $guestType,
      guestValue: $guestValue,
      hostType: $hostType,
      hostValue: $hostValue,
      currency: $currency
    ) {
        id
        guestType
        guestValue
        hostType
        hostValue
        currency
        status
    }
}
**/