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

export default function LoginPage2() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios
      .post(`${URL_USER_SVC}/login`, { username, password }, { withCredentials: true })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_NOT_FOUND) {
          console.log('Username is not registered');
        } else if (err.response.status === STATUS_CODE_UNAUTHORISED) {
          console.log('Incorrect password');
        } else if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          console.log('Username or password is missing');
        } else {
          console.log('Please try again later');
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

  return (
    <Box
      className="Login"
      width="90%"
      height="90%"
      bgcolor={'primary.main'}
      gridRow={2}
      borderRadius={'10px'}
      padding={'5%'}
      display={'flex'}>
      <Box
        display={'flex'}
        width={'50%'}
        className="Logo"
        justifyContent={'center'}
        alignItems={'center'}>
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
            required: true,
            autoFocus: false,
            onChange: (event) => {
              setPassword(event.target.value);
            }
          }
        ]}
        link={{ path: '/signup', message: "Don't have an account? Sign Up." }}
        onSubmit={handleLogin}
      />
    </Box>
  );
}
