import { Sequelize, DataTypes } from 'sequelize';

const QueueingUser = (sequelize: Sequelize) => {
  return sequelize.define('QueueingUser', {
    socketId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false
    }
  });
};

export default QueueingUser;
