import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

import ProfileType from './ProfileType';
import { UserProfile } from '../models';

const ForgotPasswordType = new ObjectType({
  name: 'ForgotPassword',
  fields: {
    id: { type: StringType },
    userId: { type: StringType },
    token: { type: StringType },
    profile: {
      type: ProfileType,
      resolve(forgotPassword) {
        return UserProfile.findOne({
          where: { userId: forgotPassword.userId }
        });
      }
    },
    email: { type: StringType },
    createdAt: { type: StringType },
    status: { type: StringType },
  },
});

export default ForgotPasswordType;