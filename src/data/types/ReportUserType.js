import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import { UserProfile, User } from '../models';

import ProfileType from './ProfileType';
import UserType from './UserType';

const ReportUserType = new ObjectType({
    name: 'ReportUser',
    fields: {
        id: {
            type: IntType
        },
        reporterId: {
            type: StringType
        },
        userId: {
            type: StringType
        },
        reportType: {
            type: StringType
        },
        status: {
            type: StringType
        },
        createdAt:{
            type: StringType
        },
        firstName:{
            type: StringType
        },
        reporterData:{
            type: ProfileType,
            resolve(profile) {
                return UserProfile.findOne({
                    where: { userId: profile.reporterId },
                });
            },
        },
        userData: {
            type: ProfileType,
            resolve(profile) {
                return UserProfile.findOne({
                    where: { userId: profile.userId },
                });
            },
        },
        userEmail: {
            type: UserType,
            async resolve(userProfile) {
                return await User.findOne({ where: { id: userProfile.userId } });
            }
        },
        reporterEmail: {
            type: UserType,
            async resolve(userProfile) {
                return await User.findOne({ where: { id: userProfile.reporterId } });
            }
        },
        userProfileId: {
            type: ProfileType,
            async resolve(profile) {
                return await UserProfile.findOne({ where: { userId: profile.reporterId } });
            }
        }
    }              
});

export default ReportUserType;