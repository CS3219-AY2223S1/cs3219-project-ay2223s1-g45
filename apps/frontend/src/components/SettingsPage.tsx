import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { URL_USER_SVC } from '../configs';
import { STATUS_CODE_INTERNAL_SERVER_ERROR, STATUS_CODE_OK } from '../constants';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function SettingsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
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
    } else {
      closeDialog();
    }
  };

  const handleDelete = async () => {
    const res = await axios.delete(`${URL_USER_SVC}/`, { withCredentials: true }).catch((err) => {
      if (err.response.status === STATUS_CODE_INTERNAL_SERVER_ERROR) {
        setErrorDialog('Unable to delete');
      } else {
        setErrorDialog('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_OK) {
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
          onClick={handleDelete}
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
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default SettingsPage;
