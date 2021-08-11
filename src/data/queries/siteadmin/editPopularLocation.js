import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

// Models
import { PopularLocation } from '../../models';

// Types
import PopularLocationType from '../../types/siteadmin/PopularLocationType';

const editPopularLocation = {

    type: PopularLocationType,

    args: {
        id: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { id }) {

        // Get All User Profile Data
        const LocationData = await PopularLocation.find({
            attributes: [
                'id',
                'location',
                'locationAddress',
                'image',
                'isEnable'
            ],
            where: {
                id: id
            }
        });

        return LocationData;

    },
};

export default editPopularLocation;

/*

query editPopularLocation ($id: Int!) {
    editPopularLocation (id: $id) {
        id
        location
        locationAddress
        isEnable
        image
    }
}

*/
