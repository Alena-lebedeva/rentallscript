import ReportUserType from '../../../types/ReportUserType';
import { ReportUser } from '../../../models';

import sequelize from '../../../sequelize';

import {
    GraphQLList as List
} from 'graphql';

const getAllReport = {

    type: new List(ReportUserType),

    async resolve({ request }) {
        return await ReportUser.findAll({
            order: 'id DESC',
            // using where condition

            where: {
                userId: {
                    $in: [
                        sequelize.literal(`SELECT id FROM  User`)
                    ]
                },
                reporterId: {
                    $in: [
                        sequelize.literal(`SELECT id FROM  User`)
                    ]
                },
            }
            
        });
    }
};

export default getAllReport;

/**
query getAllReport{
  getAllReport{
    id
    reporterId
    userId
    reportType
  }
}

**/