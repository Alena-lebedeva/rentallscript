import ListPhotosType from '../../../types/ListPhotosType';

import { Listing, ListPhotos } from '../../../models';

import {
  GraphQLList as List,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const adminRemoveListing = {

  type: new List(ListPhotosType),

  args: {
    listId: { type: new NonNull(IntType) },
  },

  async resolve({ request }, { listId }) {

    // Check whether user is logged in
    if (request.user && request.user.admin) {

      const getPhotos = await ListPhotos.findAll({
        where: { listId }
      });

      const removelisting = await Listing.destroy({
        where: {
          id: listId
        }
      });

      if (removelisting > 0) {
        return getPhotos;
      } else {
        return {
          status: 'failed'
        }
      }

    } else {
      return {
        status: "Not loggedIn"
      };
    }
  },
};

export default adminRemoveListing;