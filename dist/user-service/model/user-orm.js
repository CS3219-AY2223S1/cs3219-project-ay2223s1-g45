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
import createUser from './repository';
// need to separate orm functions from repository to decouple business logic from persistence
export default function ormCreateUser(username, password) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const newUser = yield createUser({ username, password });
      newUser.save();
      return true;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('ERROR: Could not create new user');
      return { err };
    }
  });
}
