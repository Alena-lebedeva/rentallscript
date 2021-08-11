import PaymentMethodsType from '../../types/PaymentMethodsType';
import { PaymentMethods } from '../../models';

import {
    GraphQLList as List
} from 'graphql';

const getPaymentMethods = {

    type: new List(PaymentMethodsType),

    async resolve({ request }, { listId }) {
        if (request.user && !request.user.admin) {
            return await PaymentMethods.findAll();
        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default getPaymentMethods;