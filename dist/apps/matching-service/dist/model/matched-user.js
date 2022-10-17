import { DataTypes } from 'sequelize';
const MatchedUser = (sequelize) => {
    return sequelize.define('MatchedUser', {
        socketId1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        socketId2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.ENUM('easy', 'medium', 'hard'),
            allowNull: false
        }
    });
};
export default MatchedUser;
