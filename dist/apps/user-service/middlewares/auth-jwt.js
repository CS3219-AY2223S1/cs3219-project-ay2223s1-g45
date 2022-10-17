import jwt from 'jsonwebtoken';
import sessionModel from '../model/session-model';
const verifyToken = (req, res, next) => {
    const { token } = req.session;
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
        jwt.verify(token, 'JWT_SECRET', (errJwt, decoded) => {
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
