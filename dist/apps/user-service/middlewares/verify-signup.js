import userModel from '../model/user-model';
const checkDuplicateUsername = (req, res, next) => {
    userModel
        .findOne({
        username: req.body.username
    })
        .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(409).send({ message: 'Failed! Username is already in use!' });
            return;
        }
        next();
    });
};
const verifySignUp = {
    checkDuplicateUsername
};
export default verifySignUp;
