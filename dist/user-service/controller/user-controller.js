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
/* eslint-disable no-else-return */
import ormCreateUser from '../model/user-orm';
export default function createUser(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const { username, password } = req.body;
      if (username && password) {
        const resp = yield ormCreateUser(username, password);
        // eslint-disable-next-line no-console
        console.log(resp);
        if (resp.err) {
          return res.status(400).json({ message: 'Could not create a new user!' });
        } else {
          // eslint-disable-next-line no-console
          console.log(`Created new user ${username} successfully!`);
          return res.status(201).json({ message: `Created new user ${username} successfully!` });
        }
      } else {
        return res.status(400).json({ message: 'Username and/or Password are missing!' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Database failure when creating new user!' });
    }
  });
}
