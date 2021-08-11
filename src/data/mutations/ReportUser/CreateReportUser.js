import ReportUserType from '../../types/ReportUserType';
import { ReportUser, UserProfile } from '../../../data/models';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import { sendServerEmail } from '../../../core/email/sendServerEmail';
import { adminEmail } from '../../../config';

const CreateReportUser = {

    type: ReportUserType,

    args: {
        reporterId: { type: StringType },
        userId: { type: StringType },
        reportType: { type: StringType },
        profileId: { type: IntType },
        reporterName: { type: StringType }
    },

    async resolve({ request }, {
        reporterId,
        reportType,
        profileId,
        userId,
        reporterName
    }) {
        let content;

        const getUser = await UserProfile.findOne({
            attributes: ['userId', 'firstName'],
            where: {
                profileId
            },
            raw: true
        });

        if (request.user && !request.user.admin == true) {

            const createReport = await ReportUser.create({
                reporterId,
                userId: getUser && getUser.userId,
                reportType
            });

            content = {
                userName: getUser && getUser.firstName,
                reporterName,
                reportType
            };

            sendServerEmail(adminEmail, 'reportUser', content);

            return {
                firstName: getUser && getUser.firstName,
                status: 'success',
            }
        } else {
            return {
                status: 'failed'
            }
        }

    },
};

export default CreateReportUser;
