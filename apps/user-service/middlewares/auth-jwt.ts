import jwt from 'jsonwebtoken';

const verifyToken = (req: any, res: any, next: any) => {
  const { token } = req.session;
  if (!token) {
    res.status(401).send({ message: 'Unauthenticated! No token provided!' });
  }
  // TODO: should use as secret environment variable
  jwt.verify(token, 'JWT_SECRET', (err: any, decoded: any) => {
    if (err) {
      res.status(403).send({
        message: 'Unauthorized! You do not have permission to view this resource!'
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken
};

export default authJwt;
