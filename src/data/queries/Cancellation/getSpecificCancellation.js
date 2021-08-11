// GrpahQL
import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import CancellationType from '../../types/CancellationType';
import { Cancellation } from '../../models';

const getSpecificCancellation = {

  type: CancellationType,

  args: {
    cancellationId: { type: new NonNull(IntType) }
  },

  async resolve({ request }, { cancellationId }) {
    return await Cancellation.findOne({ where: { isEnable: true, id: cancellationId } });
  }
};

export default getSpecificCancellation;

/**

query getSpecificCancellation($cancellationId: Int!){
  getSpecificCancellation(cancellationId: $cancellationId) {
    id
    policyName
    priorDays
    accommodationPriorCheckIn
    accommodationBeforeCheckIn
    accommodationDuringCheckIn
    guestFeePriorCheckIn
    guestFeeBeforeCheckIn
    guestFeeDuringCheckIn
    hostFeePriorCheckIn
    hostFeeBeforeCheckIn
    hostFeeDuringCheckIn
    isEnable
  }
}

**/