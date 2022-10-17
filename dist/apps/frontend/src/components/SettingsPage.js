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
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Logo } from './Logo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { URL_USER_SVC } from '../configs';
import {
  STATUS_CODE_FORBIDDEN,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
  STATUS_CODE_UNAUTHORISED
} from '../constants';
import { useState } from 'react';
export default function SettingsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    title: '',
    message: ''
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
  const handleLogout = () =>
    __awaiter(this, void 0, void 0, function* () {
      const res = yield axios
        .post(`${URL_USER_SVC}/logout`, {}, { withCredentials: true })
        .catch((err) => {
          if (err.response.status === STATUS_CODE_INTERNAL_SERVER_ERROR) {
            console.log('Unable to log out');
          } else {
            console.log('Please try again later');
          }
        });
      if (res && res.status === STATUS_CODE_OK) {
        navigate('../login');
        logout();
      }
    });
  const confirmDelete = () => {
    setDialogDetails({ message: 'Are you sure you want to delete your account?', button: true });
    setDialogOpen(true);
  };
  const handleDelete = () =>
    __awaiter(this, void 0, void 0, function* () {
      onCloseDialog();
      const res = yield axios.delete(`${URL_USER_SVC}/`, { withCredentials: true }).catch((err) => {
        setDialogOpen(true);
        if (err.response.status === STATUS_CODE_INTERNAL_SERVER_ERROR) {
          setDialogDetails({ message: 'Unable to delete', error: true });
        } else if (err.response.status === STATUS_CODE_UNAUTHORISED) {
          setDialogDetails({ message: 'Not Authenticated. Please log in again.', error: true });
        } else if (err.response.status === STATUS_CODE_FORBIDDEN) {
          setDialogDetails({ message: 'Unauthorised Action. Please log in again.', error: true });
        } else {
          setDialogDetails({ message: 'Please try again later', error: true });
        }
      });
      if (res && res.status === STATUS_CODE_OK) {
        navigate('../login');
        logout();
      }
    });
  const handleChangePassword = () =>
    __awaiter(this, void 0, void 0, function* () {
      navigate('../change-password');
    });
  return React.createElement(
    Box,
    {
      className: 'Settings',
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
    React.createElement(
      Box,
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
      },
      React.createElement(
        Typography,
        { variant: 'h3', marginBottom: '2rem', fontFamily: 'Arimo' },
        'Settings'
      ),
      React.createElement(
        Button,
        {
          variant: 'outlined',
          color: 'secondary',
          onClick: handleChangePassword,
          sx: {
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
            margin: '0.5rem',
            width: '65%'
          }
        },
        'Change Password'
      ),
      React.createElement(
        Button,
        {
          variant: 'outlined',
          color: 'secondary',
          onClick: handleLogout,
          sx: {
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
            margin: '0.5rem',
            width: '65%'
          }
        },
        'Log Out'
      ),
      React.createElement(
        Button,
        {
          variant: 'outlined',
          color: 'secondary',
          onClick: confirmDelete,
          sx: {
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
            margin: '0.5rem',
            width: '65%'
          }
        },
        'Delete Account'
      )
    ),
    React.createElement(
      Dialog,
      { open: dialogOpen, onClose: onCloseDialog },
      React.createElement(DialogTitle, null, dialogDetails.title),
      React.createElement(
        DialogContent,
        null,
        React.createElement(DialogContentText, null, dialogDetails.message)
      ),
      dialogDetails.button &&
        React.createElement(
          Box,
          { display: 'flex', justifyContent: 'center' },
          React.createElement(
            Button,
            {
              variant: 'outlined',
              color: 'secondary',
              onClick: handleDelete,
              sx: {
                background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
                margin: '0.5rem',
                width: '40%'
              }
            },
            'Yes'
          ),
          React.createElement(
            Button,
            {
              variant: 'outlined',
              color: 'secondary',
              onClick: onCloseDialog,
              sx: {
                background: 'linear-gradient(90deg, #EF429A, #AC44B0)',
                margin: '0.5rem',
                width: '40%'
              }
            },
            'No'
          )
        )
    )
  );
}
