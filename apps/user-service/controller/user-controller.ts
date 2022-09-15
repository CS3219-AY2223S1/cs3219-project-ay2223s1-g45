import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import ormCreateSession from '../model/session-orm';
import ormCreateUser from '../model/user-orm';
import userModel from '../model/user-model';

export async function createUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const newUser = await ormCreateUser(username, password);
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

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = req.userId;
    userModel.findByIdAndDelete(id, async (err: CallbackError, docs: Document) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!docs) {
        res.status(404).send({ message: 'User Not Found!' });
        return;
      }
      const token = req.session?.token;
      if (!token) {
        res.status(401).send({ message: 'Unauthenticated! No token provided!' });
        return;
      }
      const blacklistedSession = await ormCreateSession(token);
      blacklistedSession.save((errSession) => {
        if (errSession) {
          res.status(500).send({ message: errSession });
          return;
        }
        req.session = undefined;
        res.status(200).send({ message: `User ${id} has been deleted!` });
      });
    });
  } catch (err) {
    res.status(500).send({ message: `Database failure when deleting user! ${err}` });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  if (username && password) {
    userModel
      .findOne({
        username
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
        const passwordIsValid = bcryptjs.compareSync(password, user.password);
        if (!passwordIsValid) {
          res.status(401).send({ message: 'Invalid Password!' });
          return;
        }
        // TODO: should use as secret environment variable
        const token = jwt.sign({ id: user.id }, 'JWT_SECRET', {
          expiresIn: 86400 // 24 hours
        });
        req.session!.token = token;
        res.status(200).send({
          username: user.username,
          id: user.id,
          message: "You've been logged in!"
        });
      });
  } else {
    res.status(400).send({ message: 'Username and/or Password are missing!' });
  }
}

export async function logout(req: Request, res: Response) {
  const token = req.session?.token;
  if (!token) {
    res.status(200).send({ message: 'You are already logged out!' });
    return;
  }
  const blacklistedSession = await ormCreateSession(token);
  blacklistedSession.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    req.session = undefined;
    res.status(200).send({ message: "You've been logged out!" });
  });
}

export async function changePassword(req: Request, res: Response) {
  try {
    const id = req.userId;
    const newPassword = req.body.password;
    if (!newPassword) {
      res.status(404).send({ message: 'New password missing!' });
      return;
    }
    const saltRounds = 10;
    const salt = await bcryptjs.genSalt(saltRounds);
    const passwordHash = await bcryptjs.hash(newPassword, salt);
    userModel.findByIdAndUpdate(
      id,
      { password: passwordHash },
      (err: CallbackError, docs: Document) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!docs) {
          res.status(404).send({ message: 'User Not Found!' });
          return;
        }
        res.status(200).send({ message: `Password for user ${id} has been updated!` });
      }
    );
  } catch (err) {
    res.status(500).send({ message: `Database failure when changing password! ${err}` });
  }
}

// Dummy API to test authorization
export async function userContent(req: Request, res: Response) {
  res.status(200).send({ userId: req.userId, message: 'User content' });
}
