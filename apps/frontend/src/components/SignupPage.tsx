import { Box } from '@mui/material';
import { Logo } from './Logo';
import { DialogDetails, Form } from './Form';
import { useState } from 'react';
import axios from 'axios';
import { STATUS_CODE_CONFLICT, STATUS_CODE_BAD_REQUEST, STATUS_CODE_CREATED } from '../constants';
import { URL_USER_SVC } from '../configs';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({
    title: '',
    message: ''
  } as DialogDetails);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await axios.post(`${URL_USER_SVC}/`, { username, password }).catch((err) => {
      setDialogOpen(true);
      if (err.response.status === STATUS_CODE_CONFLICT) {
        setDialogDetails({ message: 'This username already exists', error: true });
      } else if (err.response.status === STATUS_CODE_BAD_REQUEST) {
        setDialogDetails({ message: 'Username or password is missing', error: true });
      } else {
        setDialogDetails({ message: 'Please try again later', error: true });
      }
    });
    if (res && res.status === STATUS_CODE_CREATED) {
      navigate('../login');
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
            type: 'password',
            required: true,
            autoFocus: false,
            onChange: (event) => {
              setPassword(event.target.value);
            }
          }
        ]}
        link={{ path: '/login', message: 'Already have an account? Log In.' }}
        onSubmit={handleSignup}
        onCloseDialog={onCloseDialog}
        dialogOpen={dialogOpen}
        dialogDetails={dialogDetails}
      />
    </Box>
  );
}
