var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { Box } from '@mui/material';
import { Logo } from './Logo';
import { Form } from './Form';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_OK,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_UNAUTHORISED
} from '../constants';
import { URL_USER_SVC } from '../configs';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    title: '',
    message: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const validate = () => {
    return !(username === '' || password === '');
  };
  const handleLogin = () =>
    __awaiter(this, void 0, void 0, function* () {
      if (validate()) {
        const res = yield axios
          .post(`${URL_USER_SVC}/login`, { username, password }, { withCredentials: true })
          .catch((err) => {
            setDialogOpen(true);
            if (err.response.status === STATUS_CODE_NOT_FOUND) {
              setDialogDetails({ message: 'Username is not registered', error: true });
            } else if (err.response.status === STATUS_CODE_UNAUTHORISED) {
              setDialogDetails({ message: 'Incorrect password', error: true });
            } else if (err.response.status === STATUS_CODE_BAD_REQUEST) {
              setDialogDetails({ message: 'Username or password is missing', error: true });
            } else {
              setDialogDetails({ message: 'Please try again later', error: true });
            }
          });
        if (res && res.status === STATUS_CODE_OK) {
          login({
            username: res.data.username,
            id: res.data.id
          });
          navigate('../match');
        }
      } else {
        setDialogOpen(true);
        setDialogDetails({ message: 'Username or password is missing', error: true });
      }
    });
  const onCloseDialog = () => {
    setDialogOpen(false);
    resetDialog();
  };
  const resetDialog = () => {
    setDialogDetails({
      title: '',
      message: ''
    });
  };
  return React.createElement(
    Box,
    {
      className: 'Login',
      width: '90%',
      height: '90%',
      bgcolor: 'primary.light',
      gridRow: 2,
      borderRadius: '10px',
      padding: '5%',
      display: 'flex'
    },
    React.createElement(
      Box,
      {
        display: 'flex',
        width: '50%',
        className: 'Logo',
        justifyContent: 'center',
        alignItems: 'center'
      },
      React.createElement(Logo, null)
    ),
    React.createElement(Form, {
      title: 'Log In',
      fields: [
        {
          label: 'Username',
          variant: 'standard',
          required: true,
          autoFocus: true,
          onChange: (event) => {
            setUsername(event.target.value);
          }
        },
        {
          label: 'Password',
          variant: 'standard',
          type: 'password',
          required: true,
          autoFocus: false,
          onChange: (event) => {
            setPassword(event.target.value);
          }
        }
      ],
      link: { path: '/signup', message: "Don't have an account? Sign Up." },
      onSubmit: handleLogin,
      onCloseDialog: onCloseDialog,
      dialogOpen: dialogOpen,
      dialogDetails: dialogDetails
    })
  );
}
