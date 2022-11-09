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
import type { DialogDetails } from './Form';
import { useState } from 'react';

export default function SettingsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    const res = await axios
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
  };

  const confirmDelete = () => {
    setDialogDetails({ message: 'Are you sure you want to delete your account?', button: true });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    onCloseDialog();
    const res = await axios.delete(`${URL_USER_SVC}/`, { withCredentials: true }).catch((err) => {
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
  };

  const handleChangePassword = async () => {
    navigate('../change-password');
  };

  return (
    <Box
      className="Settings"
      width="90%"
      height="90%"
      bgcolor={'primary.light'}
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
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'50%'}
      >
        <Typography variant={'h3'} marginBottom={'2rem'} fontFamily={'Arimo'}>
          Settings
        </Typography>
        <Button
          variant={'outlined'}
          color={'secondary'}
          onClick={handleChangePassword}
          sx={{
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
            margin: '0.5rem',
            width: '65%'
          }}
        >
          Change Password
        </Button>
        <Button
          variant={'outlined'}
          color={'secondary'}
          onClick={handleLogout}
          sx={{
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
            margin: '0.5rem',
            width: '65%'
          }}
        >
          Log Out
        </Button>
        <Button
          variant={'outlined'}
          color={'secondary'}
          onClick={confirmDelete}
          sx={{
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
            margin: '0.5rem',
            width: '65%'
          }}
        >
          Delete Account
        </Button>
      </Box>
      <Dialog open={dialogOpen} onClose={onCloseDialog}>
        <DialogTitle>{dialogDetails.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogDetails.message}</DialogContentText>
        </DialogContent>
        {dialogDetails.button && (
          <Box display={'flex'} justifyContent={'center'}>
            <Button
              variant={'outlined'}
              color={'secondary'}
              onClick={handleDelete}
              sx={{
                background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
                margin: '0.5rem',
                width: '40%'
              }}
            >
              Yes
            </Button>
            <Button
              variant={'outlined'}
              color={'secondary'}
              onClick={onCloseDialog}
              sx={{
                background: 'linear-gradient(90deg, #EF429A, #AC44B0)',
                margin: '0.5rem',
                width: '40%'
              }}
            >
              No
            </Button>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
