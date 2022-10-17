import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Link } from 'react-router-dom';
export function Form({ title, fields, link, onSubmit, dialogOpen, onCloseDialog, dialogDetails }) {
  return React.createElement(
    Box,
    {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    React.createElement(Typography, { variant: 'h3', marginBottom: '2rem' }, title),
    React.createElement(
      Box,
      { display: 'flex', flexDirection: 'column', width: '75%', marginBottom: '2rem' },
      fields.map((field, index) =>
        React.createElement(
          TextField,
          Object.assign({ key: index }, field, { error: dialogDetails.error })
        )
      )
    ),
    React.createElement(
      Button,
      {
        color: 'secondary',
        sx: { background: 'linear-gradient(90deg, #AC44B0, #EF429A)', width: '75%' },
        onClick: onSubmit
      },
      title
    ),
    React.createElement(
      Link,
      { to: link.path, color: '#EF429A', style: { marginTop: '3%' } },
      link.message
    ),
    React.createElement(
      Dialog,
      { open: dialogOpen, onClose: onCloseDialog },
      React.createElement(DialogTitle, null, dialogDetails.title),
      React.createElement(
        DialogContent,
        null,
        React.createElement(DialogContentText, null, dialogDetails.message)
      )
    )
  );
}
