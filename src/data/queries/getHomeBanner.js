import HomeBannerType from '../types/HomeBannerType';
import { HomeBanner } from '../models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import sequelize from '../sequelize';

const getHomeBanner = {

  type: new List(HomeBannerType),

  async resolve({ request }) {
    const data = await HomeBanner.findAll({
      order: [[sequelize.literal('RAND()')]],
      limit: 3
    });
    return data;

  }
};

export default getHomeBanner;
