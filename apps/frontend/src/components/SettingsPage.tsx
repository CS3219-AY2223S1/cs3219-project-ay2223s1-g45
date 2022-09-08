import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { URL_USER_SVC } from '../configs';
import {
  STATUS_CODE_FORBIDDEN,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
  STATUS_CODE_UNAUTHORISED
} from '../constants';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function SettingsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordErrorState, setNewPasswordErrorState] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios
      .post(`${URL_USER_SVC}/logout`, {}, { withCredentials: true })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_INTERNAL_SERVER_ERROR) {
          setErrorDialog('Unable to log out');
        } else {
          setErrorDialog('Please try again later');
        }
      });
    if (res && res.status === STATUS_CODE_OK) {
      handleNavigation();
    }
  };

  const handleDelete = async () => {
    const res = await axios.delete(`${URL_USER_SVC}/`, { withCredentials: true }).catch((err) => {
      if (err.response.status === STATUS_CODE_INTERNAL_SERVER_ERROR) {
        setErrorDialog('Unable to delete');
      } else if (err.response.status === STATUS_CODE_UNAUTHORISED) {
        setErrorDialog('Not Authenticated. Please log in again.');
      } else if (err.response.status === STATUS_CODE_FORBIDDEN) {
        setErrorDialog('Unauthorised Action. Please log in again.');
      } else {
        setErrorDialog('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_OK) {
      handleNavigation();
    }
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
          setErrorDialog('Unable to change password');
        } else if (err.response.status === STATUS_CODE_UNAUTHORISED) {
          setErrorDialog('Not Authenticated. Please log in again.');
        } else if (err.response.status === STATUS_CODE_FORBIDDEN) {
          setErrorDialog('Unauthorised Action. Please log in again.');
        } else {
          setErrorDialog('Please try again later');
        }
      });
    if (res && res.status === STATUS_CODE_OK) {
      setSuccessDialog('Password changed successfully');
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

  const setErrorDialog = (msg: any) => {
    setIsDialogOpen(true);
    setDialogTitle('Error');
    setDialogMsg(msg);
  };

  const setSuccessDialog = (msg: any) => {
    setIsDialogOpen(true);
    setDialogTitle('Success');
    setDialogMsg(msg);
  };

  const handleNavigation = () => {
    navigate('../login');
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'90%'}
      alignItems={'center'}
      fontFamily={'Arimo'}
      borderRadius={'10px'}
      padding={'5%'}
      style={{ backgroundColor: 'white' }}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-end'}
        alignItems={'center'}>
        <Typography variant={'h3'} marginBottom={'2rem'} fontFamily={'Arimo'}>
          Settings
        </Typography>
        <TextField
          label="New Password"
          variant="standard"
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPasswordErrorState(false);
            setNewPassword(e.target.value);
          }}
          sx={{ marginBottom: '1rem', width: '75%' }}
          autoFocus
          required
          error={newPasswordErrorState}
        />
        <Button
          variant={'outlined'}
          onClick={() => {
            if (newPassword === '') {
              setNewPasswordErrorState(true);
              return;
            }
            handleChangePassword();
          }}
          style={{
            color: 'white',
            borderColor: 'white',
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)'
          }}>
          Change Password
        </Button>
        <Button
          variant={'outlined'}
          onClick={handleLogout}
          style={{
            color: 'white',
            borderColor: 'white',
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)'
          }}>
          Log Out
        </Button>
        <Button
          variant={'outlined'}
          onClick={handleDelete}
          style={{
            color: 'white',
            borderColor: 'white',
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)'
          }}>
          Delete Account
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default SettingsPage;
