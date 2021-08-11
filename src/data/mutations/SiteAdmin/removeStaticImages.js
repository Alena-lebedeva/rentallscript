import StaticBlockType from '../../types/siteadmin/StaticBlockType';
import { StaticInfoBlock } from '../../../data/models';

import {
    GraphQLString as StringType
} from 'graphql';

const removeStaticImages = {

    type: StaticBlockType,

    args: {
        name: { type: StringType },
    },

    async resolve({ request }, { name }) {

        if (request.user && request.user.admin == true) {

            let removeStaticImages = await StaticInfoBlock.update({
                image: null
            },
                {
                    where: { name: name }
                });

            if (removeStaticImages) {
                return {
                    status: 'success'
                }
            } else {
                return {
                    status: 'failed'
                }
            }

        } else {
            return {
                status: 'not logged in'
            }
        }

    },
};

export default removeStaticImages;
