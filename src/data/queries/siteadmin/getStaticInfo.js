import StaticBlockType from '../../types/siteadmin/StaticBlockType';
import { StaticInfoBlock } from '../../../data/models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
} from 'graphql';

const getStaticInfo = {

    type: new List(StaticBlockType),

    args: {
        name: { type: StringType },
    },

    async resolve({ request }, { name }) {

        let staticBlockData;

        if (name) {
            // Get Specific Info of Block Data
            staticBlockData = await StaticInfoBlock.findAll({
                attributes: [
                    'id',
                    'title',
                    'content',
                    'image',
                    'name',
                    'isEnable'
                ],
                where: {
                    name: name
                }
            });
        } else {
            // Get Specific Info of Block Data
            staticBlockData = await StaticInfoBlock.findAll({
                attributes: [
                    'id',
                    'title',
                    'content',
                    'image',
                    'name',
                    'isEnable'
                ],
            });
        }


        return staticBlockData;

    },
};

export default getStaticInfo;
