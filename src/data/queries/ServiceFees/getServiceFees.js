import ServiceFeesType from '../../types/ServiceFeesType';

// Sequelize models
import { ServiceFees } from '../../models';

const getServiceFees = {

  type: ServiceFeesType,

  async resolve({ request, response }) {
    return await ServiceFees.findOne();
  },
};

export default getServiceFees;

/**
query getServiceFees{
    getServiceFees{
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