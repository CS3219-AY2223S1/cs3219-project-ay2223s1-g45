/* eslint-disable no-else-return */
import ormCreateUser from '../model/user-orm';

export default async function createUser(req: any, res: any) {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const newUser = ormCreateUser(username, password);
      newUser.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(201).send({ message: 'User was registered successfully!' });
      });
    } else {
      res.status(400).send({ message: 'Username and/or Password are missing!' });
    }
  } catch (err) {
    res.status(500).send({ message: `Database failure when creating new user! ${err}` });
  }
}
