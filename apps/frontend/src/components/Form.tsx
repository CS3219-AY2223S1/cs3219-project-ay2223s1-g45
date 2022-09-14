import {
  Box,
  Typography,
  TextField,
  TextFieldProps,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Link } from 'react-router-dom';

export type DialogDetails = {
  title?: string;
  message: string;
  error?: boolean;
  button?: boolean;
};

export type FormProps = {
  title: string;
  fields: Array<TextFieldProps & { autoFocus: boolean } & { onChange: (event: any) => void }>;
  link: {
    path: string;
    message: string;
  };
  onSubmit: () => void;
  onCloseDialog: () => void;
  dialogOpen: boolean;
  dialogDetails: DialogDetails;
};

export function Form({
  title,
  fields,
  link,
  onSubmit,
  dialogOpen,
  onCloseDialog,
  dialogDetails
}: FormProps) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'50%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography variant={'h3'} marginBottom={'2rem'}>
        {title}
      </Typography>
      <Box display={'flex'} flexDirection={'column'} width={'75%'} marginBottom={'2rem'}>
        {fields.map((field, index) => (
          <TextField key={index} {...field} error={dialogDetails.error} />
        ))}
      </Box>
      <Button
        color={'primary'}
        sx={{ background: 'linear-gradient(90deg, #AC44B0, #EF429A)' }}
        onClick={onSubmit}
      >
        {title}
      </Button>
      <Link to={link.path} color={'#EF429A'} style={{ marginTop: '3%' }}>
        {link.message}
      </Link>
      <Dialog open={dialogOpen} onClose={onCloseDialog}>
        <DialogTitle>{dialogDetails.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogDetails.message}</DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
