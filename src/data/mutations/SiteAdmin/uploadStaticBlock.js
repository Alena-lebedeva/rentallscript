import StaticBlockType from '../../types/siteadmin/StaticBlockType';
import { StaticInfoBlock } from '../../models';

import {
    GraphQLString as StringType
} from 'graphql';

const uploadStaticBlock = {

    type: StaticBlockType,

    args: {
        fileName: { type: StringType },
        filePath: { type: StringType },
        name: { type: StringType }
    },

    async resolve({ request }, { fileName, filePath, name }) {

        if (request.user && request.user.admin == true) {

            const UpdateStaticInfoBlock = await StaticInfoBlock.update({
                image: fileName
            }, {
                    where: {
                        name: name
                    }
                });

            if (UpdateStaticInfoBlock) {
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

export default uploadStaticBlock;
