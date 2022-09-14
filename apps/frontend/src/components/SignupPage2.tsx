import { Box } from '@mui/material';
import { Logo } from './Logo';
import { Form } from './Form';
import { useState } from 'react';
import axios from 'axios';
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CREATED,
} from '../constants';
import { URL_USER_SVC } from '../configs';
import { useNavigate } from 'react-router-dom';

export default function SignupPage2() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await axios.post(`${URL_USER_SVC}/`, { username, password }).catch((err) => {
      if (err.response.status === STATUS_CODE_CONFLICT) {
        console.log('This username already exists');
      } else if (err.response.status === STATUS_CODE_BAD_REQUEST) {
        console.log('Username or password is missing');
      } else {
        console.log('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_CREATED) {
      navigate('../login');
    }
  };

  return (
    <Box
      className="Signup"
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
        title={'Sign Up'}
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
        link={{ path: '/login', message: 'Already have an account? Log In.' }}
        onSubmit={handleSignup}
      />
    </Box>
  );
}
