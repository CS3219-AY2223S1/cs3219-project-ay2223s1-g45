import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ormCreateUser from '../model/user-orm';
import userModel from '../model/user-model';

export async function createUser(req: any, res: any) {
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

export async function login(req: any, res: any) {
  userModel
    .findOne({
      username: req.body.username
    })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        res.status(404).send({ message: 'User Not found.' });
        return;
      }
      const passwordIsValid = bcryptjs.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        res.status(401).send({ message: 'Invalid Password!' });
        return;
      }
      // TODO: should use as secret environment variable
      const token = jwt.sign({ id: user.id }, 'JWT_SECRET', {
        expiresIn: 86400 // 24 hours
      });
      req.session.token = token;
      res.status(200).send({
        username: user.username,
        message: "You've been logged in!"
      });
    });
}

export async function logout(req: any, res: any) {
  req.session = null;
  return res.status(200).send({ message: "You've been logged out!" });
}

// Dummy API to test authorization
export async function userContent(req: any, res: any) {
  res.status(200).send({ userId: req.userId, message: 'User content' });
}
