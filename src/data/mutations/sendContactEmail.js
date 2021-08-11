// GrpahQL
import {
  GraphQLString as StringType
} from 'graphql';

import CountryType from '../types/CountryType';

import { sendServerEmail } from '../../core/email/sendServerEmail';
import { adminEmail } from '../../config';

const sendContactEmail = {

  type: CountryType,

  args: {
    phoneNumber: { type: StringType },
    name: { type: StringType },
    email: { type: StringType },
    ContactMessage: { type: StringType }
  },
  async resolve({ request }, {
    phoneNumber,
    name,
    email,
    ContactMessage
  }) {
    let content = {
      phoneNumber,
      name,
      email,
      ContactMessage
    };

    await sendServerEmail(adminEmail, 'contact', content);

    return {
      status: '200'
    };
  },
};
export default sendContactEmail;

/*

mutation sendContactEmail(
  $phoneNumber: String,
  $name: String,
  $email: String,
  $ContactMessage: String
){
    sendContactEmail(
      phoneNumber: $phoneNumber,
      name: $name,
      email: $email,
      ContactMessage: $ContactMessage
    ) {
        status
    }
}

*/
