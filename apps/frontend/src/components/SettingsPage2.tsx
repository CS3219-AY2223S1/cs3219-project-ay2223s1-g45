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
import { useAuth } from '../context/AuthContext';

function SettingsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogButtonEnabled, setIsDialogButtonEnabled] = useState(false);
  const [isDialogInputEnabled, setIsDialogInputEnabled] = useState(false);
  const [dialogButtonMessage, setDialogButtonMessage] = useState('');
  const [buttonMode, setButtonMode] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordErrorState, setNewPasswordErrorState] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

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
      logout();
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
      logout();
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

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogButtonMessage('');
    setDialogTitle('');
  };

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

  const setChangePasswordConfirmationDialog = (msg: string) => {
    setIsDialogOpen(true);
    setButtonMode('changePassword');
    setIsDialogInputEnabled(true);
    setIsDialogButtonEnabled(true);
    setDialogButtonMessage(msg);
    setDialogTitle(msg);
  };

  const setDeleteConfirmationDialog = (msg: any) => {
    setIsDialogOpen(true);
    setButtonMode('deleteAccount');
    setIsDialogInputEnabled(false);
    setIsDialogButtonEnabled(true);
    setDialogTitle('Delete Account');
    setDialogButtonMessage(msg);
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
      style={{ backgroundColor: 'white' }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-end'}
        alignItems={'center'}
      >
        <Typography variant={'h3'} marginBottom={'2rem'} fontFamily={'Arimo'}>
          Settings
        </Typography>
        <Button
          variant={'outlined'}
          onClick={() => {
            setChangePasswordConfirmationDialog('Change Password');
            setSuccessDialog('');
          }}
          style={{
            color: 'white',
            borderColor: 'white',
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)'
          }}
        >
          Change Password
        </Button>
        <Button
          variant={'outlined'}
          onClick={handleLogout}
          style={{
            color: 'white',
            borderColor: 'white',
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)'
          }}
        >
          Log Out
        </Button>
        <Button
          variant={'outlined'}
          onClick={() => setDeleteConfirmationDialog('Delete Account')}
          style={{
            color: 'white',
            borderColor: 'white',
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)'
          }}
        >
          Delete Account
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
          {isDialogButtonEnabled ? (
            <Box>
              {isDialogInputEnabled ? (
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
              ) : null}
              <Button
                onClick={
                  buttonMode === 'changePassword'
                    ? () => {
                        if (newPassword === '') {
                          setNewPasswordErrorState(true);
                          return;
                        }
                        handleChangePassword();
                        setIsDialogButtonEnabled(false);
                        setButtonMode('');
                        closeDialog();
                      }
                    : () => {
                        handleDelete();
                        setIsDialogButtonEnabled(false);
                        setButtonMode('');
                        closeDialog();
                      }
                }
              >
                {dialogButtonMessage}
              </Button>
            </Box>
          ) : null}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default SettingsPage;
