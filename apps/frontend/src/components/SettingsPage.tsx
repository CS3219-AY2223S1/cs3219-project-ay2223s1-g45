import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@mui/material';
  import { useState } from 'react';
  import axios from 'axios';
  import { URL_USER_SVC } from '../configs';
  import { STATUS_CODE_CONFLICT, STATUS_CODE_OK } from '../constants';
  import { useNavigate } from 'react-router-dom';
  
  function SettingsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogMsg, setDialogMsg] = useState('');
    const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      setIsLogoutSuccess(false);
      const res = await axios.post(`${URL_USER_SVC}/Logout`).catch((err) => {
        if (err.response.status === STATUS_CODE_CONFLICT) {
          setErrorDialog('This username already exists');
        } else {
          setErrorDialog('Please try again later');
        }
      });
      if (res && res.status === STATUS_CODE_OK) {
        setSuccessDialog('User successfully logged out');
        setIsLogoutSuccess(true);
      }
    };
  
    const closeDialog = () => setIsDialogOpen(false);
  
    const setSuccessDialog = (msg: any) => {
      setIsDialogOpen(true);
      setDialogTitle('Success');
      setDialogMsg(msg);
    };
  
    const setErrorDialog = (msg: any) => {
      setIsDialogOpen(true);
      setDialogTitle('Error');
      setDialogMsg(msg);
    };

    const handleCloseDialog = () => {
        isLogoutSuccess ? navigate('../login') : navigate('../settings');
    }
  
    return (
      <Box display={'flex'} flexDirection={'column'} width={'30%'}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
          <Button variant={'outlined'} onClick={handleLogout}>
            Log Out
          </Button>
        </Box>
  
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseDialog()}>
                Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
  
export default SettingsPage;
  