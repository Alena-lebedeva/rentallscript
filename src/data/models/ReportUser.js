import DataType from 'sequelize';
import Model from '../sequelize';

const ReportUser = Model.define('ReportUser', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    reporterId: {
        type: DataType.STRING,
        allowNull: false
    },

    userId: {
        type: DataType.STRING,
        allowNull: false
    },

    reportType: {
        type: DataType.STRING,
        allowNull: false
    },
});

export default ReportUser; 