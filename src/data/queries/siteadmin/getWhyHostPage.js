import WhyHostBlockType from '../../types/WhyHostBlockType';
import { WhyHostInfoBlock } from '../../../data/models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
} from 'graphql';

const getWhyHostPage = {

    type: new List(WhyHostBlockType),

    args: {
        name: { type: StringType },
    },

    async resolve({ request }, { name }) {

        let whyHostBlockData;

        if (name) {

            whyHostBlockData = await WhyHostInfoBlock.findAll({
                attributes: [
                    'id',
                    'title',
                    'name',
                    'value',
                ],
                where: {
                    name: name
                }
            });
        } else {

            whyHostBlockData = await WhyHostInfoBlock.findAll({
                attributes: [
                    'id',
                    'title',
                    'name',
                    'value',
                ],
            });
        }

        return whyHostBlockData;

    },
};

export default getWhyHostPage;
