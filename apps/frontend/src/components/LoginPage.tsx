import { Box } from '@mui/material';
import { Logo } from './Logo';
import { DialogDetails, Form } from './Form';
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

export default function LoginPage2() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    title: '',
    message: ''
  } as DialogDetails);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios
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
      navigate('../settings');
    }
  };

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
        title={'Log In'}
        fields={[
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
        ]}
        link={{ path: '/signup', message: "Don't have an account? Sign Up." }}
        onSubmit={handleLogin}
        onCloseDialog={onCloseDialog}
        dialogOpen={dialogOpen}
        dialogDetails={dialogDetails}
      />
    </Box>
  );
}
