import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { URL_USER_SVC } from '../configs';
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await axios.post(`${URL_USER_SVC}/signup`, { username, password }).catch((err) => {
      if (err.response.status === STATUS_CODE_CONFLICT) {
        setErrorDialog('This username already exists');
      } else {
        setErrorDialog('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_CREATED) {
      handleNavigation();
    } else {
      closeDialog();
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

  const setErrorDialog = (msg: any) => {
    setIsDialogOpen(true);
    setDialogTitle('Error');
    setDialogMsg(msg);
  };

  const handleNavigation = () => {
    navigate('../login');
  };

  return (
    <Box
      display={'flex'}
      width={'90%'}
      alignItems={'center'}
      fontFamily={'Arimo'}
      borderRadius={'10px'}
      padding={'5%'}
      style={{ backgroundColor: 'white' }}
    >
      <Box display={'flex'} width={'50%'}>
        <Logo />
      </Box>
      <Box display={'flex'} flexDirection={'column'} width={'50%'} alignItems={'center'}>
        <Typography variant={'h3'} marginBottom={'2rem'} fontFamily={'Arimo'}>
          Sign Up
        </Typography>
        <TextField
          label="Username"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: '1rem', width: '75%' }}
          autoFocus
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '2rem', width: '75%' }}
        />
        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} width={'75%'}>
          <Button
            variant={'outlined'}
            onClick={handleSignup}
            style={{
              color: 'white',
              borderColor: 'white',
              background: 'linear-gradient(90deg, #AC44B0, #EF429A)'
            }}
            fullWidth
          >
            Sign up
          </Button>
        </Box>

        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} marginTop={'3%'}>
          <Link to={'../login'} color={'#EF429A'}>
            Already have an account? Log In.
          </Link>
        </Box>

        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

export default SignupPage;
