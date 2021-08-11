import ListPhotosType from '../../types/ListPhotosType';
import { Listing, ListPhotos, UserListingSteps } from '../../models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

const CreateListPhotos = {

  type: ListPhotosType,

  args: {
    listId: { type: new NonNull(IntType) },
    name: { type: StringType },
    type: { type: StringType }
  },

  async resolve({ request, response }, { listId, name, type }) {

    // Check whether user is logged in
    if (request.user || request.user.admin) {

      let where = { id: listId };
      if (!request.user.admin) {
        where = {
          id: listId,
          userId: request.user.id
        }
      };

      // Check whether listing is available
      const isListingAvailable = await Listing.findOne({ where });

      if (isListingAvailable) {

        // Create a new record for a photo
        const createPhoto = await ListPhotos.create({
          listId: listId,
          name: name,
          type: type
        });

        const photosCount = await ListPhotos.count({ where: { listId } });
        const steps = await UserListingSteps.findOne({ where: { listId } });

        if (photosCount > 0 && steps.step3 === 'completed') {
          const updateListingStatus = await Listing.update({
            isReady: true
          }, {
              where: { id: listId }
            });
        }

        return {
          status: "success",
          photosCount: photosCount
        };

      } else {
        return {
          status: "Listing is not available"
        };
      }

    } else {
      return {
        status: "Not loggedIn"
      };
    }

  },
};

export default CreateListPhotos;
