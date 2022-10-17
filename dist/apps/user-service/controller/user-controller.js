var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ormCreateSession from '../model/session-orm';
import ormCreateUser from '../model/user-orm';
import userModel from '../model/user-model';
export function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            if (username && password) {
                const newUser = yield ormCreateUser(username, password);
                newUser.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(201).send({ message: 'User was registered successfully!' });
                });
            }
            else {
                res.status(400).send({ message: 'Username and/or Password are missing!' });
            }
        }
        catch (err) {
            res.status(500).send({ message: `Database failure when creating new user! ${err}` });
        }
    });
}
export function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.userId;
            userModel.findByIdAndDelete(id, (err, docs) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!docs) {
                    res.status(404).send({ message: 'User Not Found!' });
                    return;
                }
                const blacklistedSession = yield ormCreateSession(req.session.token);
                blacklistedSession.save((errSession) => {
                    if (errSession) {
                        res.status(500).send({ message: errSession });
                        return;
                    }
                    req.session = null;
                    res.status(200).send({ message: `User ${id} has been deleted!` });
                });
            }));
        }
        catch (err) {
            res.status(500).send({ message: `Database failure when deleting user! ${err}` });
        }
    });
}
export function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
                req.session.token = token;
                res.status(200).send({
                    username: user.username,
                    id: user.id,
                    message: "You've been logged in!"
                });
            });
        }
        else {
            res.status(400).send({ message: 'Username and/or Password are missing!' });
        }
    });
}
export function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.session;
        if (!token) {
            res.status(200).send({ message: 'You are already logged out!' });
            return;
        }
        const blacklistedSession = yield ormCreateSession(token);
        blacklistedSession.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            req.session = null;
            res.status(200).send({ message: "You've been logged out!" });
        });
    });
}
export function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.userId;
            const newPassword = req.body.password;
            const saltRounds = 10;
            const salt = yield bcryptjs.genSalt(saltRounds);
            const passwordHash = yield bcryptjs.hash(newPassword, salt);
            userModel.findByIdAndUpdate(id, { password: passwordHash }, (err, docs) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!docs) {
                    res.status(404).send({ message: 'User Not Found!' });
                    return;
                }
                res.status(200).send({ message: `Password for user ${id} has been updated!` });
            });
        }
        catch (err) {
            res.status(500).send({ message: `Database failure when changing password! ${err}` });
        }
    });
}
// Dummy API to test authorization
export function userContent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).send({ userId: req.userId, message: 'User content' });
    });
}
