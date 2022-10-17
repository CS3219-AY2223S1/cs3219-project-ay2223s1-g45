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
import axios from 'axios';
import {
  STATUS_CODE_FORBIDDEN,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
  STATUS_CODE_UNAUTHORISED
} from '../constants';
import { useState } from 'react';
import { URL_USER_SVC } from '../configs';
export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    title: '',
    message: ''
  });
  const validate = () => {
    return !(newPassword === '');
  };
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
  const handleChangePassword = () =>
    __awaiter(this, void 0, void 0, function* () {
      if (validate()) {
        const res = yield axios
          .patch(
            `${URL_USER_SVC}/change-password`,
            { password: newPassword },
            { withCredentials: true }
          )
          .catch((err) => {
            setDialogOpen(true);
            if (err.response.status === STATUS_CODE_INTERNAL_SERVER_ERROR) {
              setDialogDetails({ message: 'Unable to change password', error: true });
            } else if (err.response.status === STATUS_CODE_UNAUTHORISED) {
              setDialogDetails({ message: 'Not Authenticated. Please log in again.', error: true });
            } else if (err.response.status === STATUS_CODE_FORBIDDEN) {
              setDialogDetails({
                message: 'Unauthorised Action. Please log in again.',
                error: true
              });
            } else {
              setDialogDetails({ message: 'Please try again later', error: true });
            }
          });
        if (res && res.status === STATUS_CODE_OK) {
          setDialogOpen(true);
          setDialogDetails({ message: 'Password changed successfully', error: false });
        }
      } else {
        setDialogOpen(true);
        setDialogDetails({ message: 'New password is missing', error: true });
      }
    });
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
      title: 'Change Password',
      fields: [
        {
          label: 'New Password',
          variant: 'standard',
          type: 'password',
          required: true,
          autoFocus: true,
          onChange: (event) => {
            setNewPassword(event.target.value);
          }
        }
      ],
      link: { path: '/settings', message: 'Back to settings' },
      onSubmit: handleChangePassword,
      onCloseDialog: onCloseDialog,
      dialogOpen: dialogOpen,
      dialogDetails: dialogDetails
    })
  );
}
