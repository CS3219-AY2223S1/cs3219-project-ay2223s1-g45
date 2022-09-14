import { Box, Typography, TextField, TextFieldProps, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export type FormProps = {
  title: string;
  fields: Array<TextFieldProps & { autoFocus: boolean }>;
  link: {
    path: string;
    message: string;
  };
};

export function Form({ title, fields, link }: FormProps) {

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'50%'}
      justifyContent={'center'}
      alignItems={'center'}>
      <Typography variant={'h3'} marginBottom={'2rem'}>
        {title}
      </Typography>
      <Box display={'flex'} flexDirection={'column'} width={'75%'} marginBottom={'2rem'}>
        {fields.map((field, index) => (
          <TextField key={index} {...field} />
        ))}
      </Box>
      <Button color={'primary'} sx={{ background: 'linear-gradient(90deg, #AC44B0, #EF429A)' }}>
        {title}
      </Button>
      <Link to={link.path} color={'#EF429A'} style={{ marginTop: '3%' }}>
        {link.message}
      </Link>
    </Box>
  );
}
