import StaticBlockType from '../../types/siteadmin/StaticBlockType';
import { StaticInfoBlock } from '../../../data/models';

import {
    GraphQLString as StringType
} from 'graphql';

const updateStaticBlockSettings = {

    type: StaticBlockType,

    args: {
        headerTitle: { type: StringType },
        headerContent: { type: StringType },
        blockTitle1: { type: StringType },
        blockContent1: { type: StringType },
        blockTitle2: { type: StringType },
        blockContent2: { type: StringType },
        blockImage1: { type: StringType },
        blockImage2: { type: StringType },
        isEnable: { type: StringType }
    },

    async resolve({ request }, {
        headerTitle,
        headerContent,
        blockTitle1,
        blockContent1,
        blockTitle2,
        blockContent2,
        blockImage1,
        blockImage2,
        isEnable
    }) {

        if (request.user && request.user.admin == true) {
            let isStaticBlockSettingsUpdated = false;

            // Header Info
            const updateHeader = await StaticInfoBlock.update({ content: headerContent, title: headerTitle, isEnable: isEnable }, { where: { name: 'header' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            // Block 1 Info
            // if (blockTitle1 && blockContent1 && blockImage1) {
            const updateBlock1 = await StaticInfoBlock.update({ title: blockTitle1, content: blockContent1, image: blockImage1 }, { where: { name: 'block1' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });
            // }

            // Block 2 Info
            // if (blockTitle2 && blockContent2 && blockImage2) {
            const updateBlock2 = await StaticInfoBlock.update({ title: blockTitle2, content: blockContent2, image: blockImage2 }, { where: { name: 'block2' } })
                .then(function (instance) {
                    // Check if any rows are affected
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });
            // }

            if (isStaticBlockSettingsUpdated) {
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
                status: 'failed'
            }
        }

    },
};

export default updateStaticBlockSettings;
