import PopularLocationType from '../../types/siteadmin/PopularLocationType';
import { PopularLocation } from '../../../data/models';
import {
    GraphQLString as StringType
} from 'graphql';
const addPopularLocation = {
    type: PopularLocationType,
    args: {
        location: { type: StringType },
        locationAddress: { type: StringType },
        image: { type: StringType }
    },
    async resolve({ request }, {
        location,
        locationAddress,
        image
    }) {

        if (request.user && request.user.admin == true) {
            const Update = await PopularLocation.create({
                location: location,
                locationAddress: locationAddress,
                image: image
            });
            return {
                status: 'success'
            }
        } else {
            return {
                status: 'failed'
            }
        }
    },
};
export default addPopularLocation;
