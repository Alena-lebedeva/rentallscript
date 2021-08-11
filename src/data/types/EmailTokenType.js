import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType
} from 'graphql';

import ProfileType from './ProfileType';
import {UserProfile} from '../models';

const EmailTokenType = new ObjectType({
  name: 'emailToken',
  fields: {
    id: { type: StringType },
    userId: { type: StringType },
    profile: {
      type: ProfileType,
      resolve (emailToken) {
        return UserProfile.findOne({
          where: { userId: emailToken.userId}
        });
      }
    },
    token: { type: StringType },
    email: { type: StringType },
    createdAt: { type: StringType },
    status: {type: StringType},
    errorMessage: { type: StringType }
  },
});

export default EmailTokenType;