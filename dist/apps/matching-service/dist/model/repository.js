var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { Sequelize, Op } from 'sequelize';
import QueueingUser from './queueing-user';
const sequelize = new Sequelize('sqlite::memory');
const queueingUser = QueueingUser(sequelize);
sequelize.sync();
export const addUserToQueue = (difficulty, socketId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    queueingUser.create({ socketId, difficulty });
  });
// Finds a user (that isn't the same user that called this method) queueing for the same difficulty
export const findMatchingUserInQueue = (difficulty, socketId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return queueingUser.findOne({
      where: { difficulty, [Op.not]: { socketId } }
    });
  });
export const removeUserFromQueue = (socketId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    queueingUser.destroy({ where: { socketId } });
  });
