import ShowListingType from '../../types/ShowListingType';
import { Listing } from '../../models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const managePublish = {

  type: ShowListingType,

  args: {
    listId: { type: new NonNull(IntType) },
    action: { type: new NonNull(StringType) },
  }, 

  async resolve({ request }, { listId, action }) {

    // Check whether user is logged in
    if(request.user || request.user.admin) {

        let where = { id: listId, isReady: true };
        if (!request.user.admin) {
            where = {
                id: listId,
                isReady: true,
                userId: request.user.id
            }
        };

        var published;
        // Publish
        if(action === 'publish') {
            const publish = await Listing.update({
                isPublished: true
            },{
                where
            }).spread(function(instance){
                // Check if any rows are affected
                if(instance > 0) {
                    published = true;
                }
            });
        }

        // UnPublish
        if(action === 'unPublish') {
            const unPublish = await Listing.update({
                isPublished: false
            },{
                where
            }).spread(function(instance){
                // Check if any rows are affected
                if(instance > 0) {
                    published = true;
                }
            });
        }

        if(published) {
            return {
                status: '200'
            };
        } else {
            return {
                status: '400'
            }
        }

      } else {
          return {
            status: "notLoggedIn"
          };
      }
    },
};

export default managePublish;

/**
mutation ManagePublish($listId: Int!, $action: String!) {
    managePublish(listId: $listId, action: $action) {
        status
    }
}
 */
