import jwt from 'jsonwebtoken';
import sessionModel from '../model/session-model';

const verifyToken = (req: any, res: any, next: any) => {
  const { token } = req.session;
  if (!token) {
    res.status(401).send({ message: 'Unauthenticated! No token provided!' });
  }
  sessionModel
    .findOne({
      token
    })
    .exec((err, tokenDb) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      if (tokenDb) {
        res.status(401).send({ message: 'Session token expired.' });
      }
      // TODO: should use as secret environment variable
      jwt.verify(token, 'JWT_SECRET', (errJwt: any, decoded: any) => {
        if (errJwt) {
          res.status(403).send({
            message: 'Unauthorized! You do not have permission to view this resource!'
          });
        }
        req.userId = decoded.id;
        next();
      });
    });
};

const authJwt = {
  verifyToken
};

export default authJwt;
