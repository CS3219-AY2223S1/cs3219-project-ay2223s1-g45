import { Box, Button, Typography } from '@mui/material';
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

export default function SettingsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    const res = await axios.delete(`${URL_USER_SVC}/`, { withCredentials: true }).catch((err) => {
      if (err.response.status === STATUS_CODE_INTERNAL_SERVER_ERROR) {
        console.log('Unable to delete');
      } else if (err.response.status === STATUS_CODE_UNAUTHORISED) {
        console.log('Not Authenticated. Please log in again.');
      } else if (err.response.status === STATUS_CODE_FORBIDDEN) {
        console.log('Unauthorised Action. Please log in again.');
      } else {
        console.log('Please try again later');
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
          color={'primary'}
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
          color={'primary'}
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
          color={'primary'}
          onClick={handleDelete}
          sx={{
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
            margin: '0.5rem',
            width: '65%'
          }}
        >
          Delete Account
        </Button>
      </Box>
    </Box>
  );
}
