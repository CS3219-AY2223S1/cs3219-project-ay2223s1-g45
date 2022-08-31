var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from "../constants";
import { Link } from "react-router-dom";
import React from "react";
function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMsg, setDialogMsg] = useState("");
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    const handleSignup = () => __awaiter(this, void 0, void 0, function* () {
        setIsSignupSuccess(false);
        const res = yield axios.post(URL_USER_SVC, { username, password })
            .catch((err) => {
            if (err.response.status === STATUS_CODE_CONFLICT) {
                setErrorDialog('This username already exists');
            }
            else {
                setErrorDialog('Please try again later');
            }
        });
        if (res && res.status === STATUS_CODE_CREATED) {
            setSuccessDialog('Account successfully created');
            setIsSignupSuccess(true);
        }
    });
    const closeDialog = () => setIsDialogOpen(false);
    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle('Success');
        setDialogMsg(msg);
    };
    const setErrorDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle('Error');
        setDialogMsg(msg);
    };
    return (React.createElement(Box, { display: "flex", flexDirection: "column", width: "30%" },
        React.createElement(Typography, { variant: "h3", marginBottom: "2rem" }, "Sign Up"),
        React.createElement(TextField, { label: "Username", variant: "standard", value: username, onChange: (e) => setUsername(e.target.value), sx: { marginBottom: "1rem" }, autoFocus: true }),
        React.createElement(TextField, { label: "Password", variant: "standard", type: "password", value: password, onChange: (e) => setPassword(e.target.value), sx: { marginBottom: "2rem" } }),
        React.createElement(Box, { display: "flex", flexDirection: "row", justifyContent: "flex-end" },
            React.createElement(Button, { variant: "outlined", onClick: handleSignup }, "Sign up")),
        React.createElement(Dialog, { open: isDialogOpen, onClose: closeDialog },
            React.createElement(DialogTitle, null, dialogTitle),
            React.createElement(DialogContent, null,
                React.createElement(DialogContentText, null, dialogMsg)),
            React.createElement(DialogActions, null, isSignupSuccess
                ? React.createElement(Button, { component: Link, to: "/login" }, "Log in")
                : React.createElement(Button, { onClick: closeDialog }, "Done")))));
}
export default SignupPage;
