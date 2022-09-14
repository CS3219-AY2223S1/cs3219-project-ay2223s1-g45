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
import type { DialogDetails } from './Form';
import { URL_USER_SVC } from '../configs';

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    title: '',
    message: ''
  } as DialogDetails);

  const onCloseDialog = () => {
    setDialogOpen(false);
    resetDialog();
  };

  const resetDialog = () => {
    setDialogDetails({
      title: '',
      message: ''
    } as DialogDetails);
  };

  const handleChangePassword = async () => {
    const res = await axios
      .patch(
        `${URL_USER_SVC}/change-password`,
        { password: newPassword },
        { withCredentials: true }
      )
      .catch((err) => {
        if (err.response.status === STATUS_CODE_INTERNAL_SERVER_ERROR) {
          console.log('Unable to change password');
        } else if (err.response.status === STATUS_CODE_UNAUTHORISED) {
          console.log('Not Authenticated. Please log in again.');
        } else if (err.response.status === STATUS_CODE_FORBIDDEN) {
          console.log('Unauthorised Action. Please log in again.');
        } else {
          console.log('Please try again later');
        }
      });
    if (res && res.status === STATUS_CODE_OK) {
      console.log('Password changed successfully');
    }
  };

  return (
    <Box
      className="Login"
      width="90%"
      height="90%"
      bgcolor={'primary.main'}
      gridRow={2}
      borderRadius={'10px'}
      padding={'5%'}
      display={'flex'}
    >
      <Box
        display={'flex'}
        width={'50%'}
        className="Logo"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Logo />
      </Box>
      <Form
        title={'Change Password'}
        fields={[
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
        ]}
        link={{ path: '/settings', message: "Don't want to change your password? Go back." }}
        onSubmit={handleChangePassword}
        onCloseDialog={onCloseDialog}
        dialogOpen={dialogOpen}
        dialogDetails={dialogDetails}
      />
    </Box>
  );
}
