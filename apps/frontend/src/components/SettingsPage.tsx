import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { URL_USER_SVC } from '../configs';
import { STATUS_CODE_CONFLICT, STATUS_CODE_OK } from '../constants';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function SettingsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.post(`${URL_USER_SVC}/logout`).catch((err) => {
      if (err.response.status === STATUS_CODE_CONFLICT) {
        setErrorDialog('Unable to log out');
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
      padding={'10%'}
      style={{ backgroundColor: 'white' }}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-end'}
        alignItems={'center'}>
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
          }}>
          Log Out
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
