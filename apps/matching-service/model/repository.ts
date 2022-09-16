import { Sequelize, Op } from 'sequelize';
import QueueingUser from './queueing-user';

const sequelize = new Sequelize('sqlite::memory');
const queueingUser = QueueingUser(sequelize);
sequelize.sync();

type Difficulty = 'easy' | 'medium' | 'hard';

export const addUserToQueue = async (difficulty: Difficulty, socketId: string) => {
  queueingUser.create({ socketId, difficulty });
};

export const findMatchingUserInQueue = async (difficulty: Difficulty, socketId: string) => {
  return queueingUser.findOne({
    where: { difficulty, [Op.not]: { socketId } }
  });
};

export const removeUserFromQueue = async (socketId: string) => {
  queueingUser.destroy({ where: { socketId } });
};
