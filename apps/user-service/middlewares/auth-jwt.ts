import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import sessionModel from '../model/session-model';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.session?.token;
  if (!token) {
    res.status(401).send({ message: 'Unauthenticated! No token provided!' });
    return;
  }
  sessionModel
    .findOne({
      token
    })
    .exec((err, tokenDb) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (tokenDb) {
        res.status(401).send({ message: 'Session token expired.' });
        return;
      }
      // TODO: should use as secret environment variable
      jwt.verify(
        token,
        'JWT_SECRET',
        (errJwt: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
          if (errJwt) {
            res.status(403).send({
              message: 'Unauthorized! You do not have permission to view this resource!'
            });
          }
          req.userId = (decoded as JwtPayload)?.id;
          next();
        }
      );
    });
};

const authJwt = {
  verifyToken
};

export default authJwt;
