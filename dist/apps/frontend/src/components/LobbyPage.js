import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  TextareaAutosize,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:8002');
function LobbyPage() {
  const [codingPadInput, setCodingPadInput] = useState('');
  const [chatMessageInput, setChatMessageInput] = useState('');
  const [allChatMessages, setAllChatMessages] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [dialogDetails, setDialogDetails] = useState({
    title: '',
    message: ''
  });
  const onCloseDialog = () => {
    setDialogOpen(false);
    resetDialog();
  };
  const resetDialog = () => {
    setDialogDetails({
      title: '',
      message: ''
    });
  };
  const confirmBack = () => {
    setDialogDetails({ message: 'Are you sure you want to leave the session?', button: true });
    setDialogOpen(true);
  };
  const handleBack = () => {
    navigate('../match');
  };
  const locationState = useLocation().state;
  const roomId = locationState.roomId;
  socket.emit('join-lobby', roomId);
  socket.on('receive-coding-pad-input', (updatedCodingPadInput) => {
    setCodingPadInput(updatedCodingPadInput);
  });
  const onSendMessage = () => {
    if (!chatMessageInput) {
      return;
    }
    socket.emit('send-chat-message', { message: chatMessageInput, roomId });
    setChatMessageInput('');
  };
  socket.on('receive-chat-message', (message) => {
    const updatedAllChatMessages = [...allChatMessages];
    updatedAllChatMessages.push(message);
    setAllChatMessages(updatedAllChatMessages);
  });
  return React.createElement(
    Box,
    {
      display: 'flex',
      flexDirection: 'row',
      width: '90%',
      height: '90%',
      alignItems: 'center',
      fontFamily: 'Arimo',
      borderRadius: '10px',
      padding: '5%',
      style: { backgroundColor: 'white' }
    },
    React.createElement(
      Box,
      { display: 'flex', flexDirection: 'column', padding: '5px', width: '35%', height: '57.5vh' },
      React.createElement(
        Box,
        { display: 'flex', flexDirection: 'column', width: '85%', height: '100%' },
        React.createElement('h3', { style: { fontFamily: 'Arimo' } }, 'Chat'),
        React.createElement(
          List,
          { sx: { height: '100%', overflowY: 'auto' } },
          allChatMessages.map((chatMessage, i) => {
            return React.createElement(
              ListItem,
              { key: i, style: { paddingLeft: '2px' } },
              chatMessage
            );
          })
        ),
        React.createElement(Input, {
          value: chatMessageInput,
          onChange: (e) => {
            setChatMessageInput(e.target.value);
          },
          sx: { margin: '0.5rem' },
          onKeyPress: (e) => {
            if (e.key === 'Enter') {
              onSendMessage();
            }
          }
        }),
        React.createElement(
          Button,
          {
            onClick: onSendMessage,
            color: 'secondary',
            style: { background: 'linear-gradient(90deg, #AC44B0, #EF429A)', margin: '0.5rem' }
          },
          'Send'
        ),
        React.createElement(
          Button,
          {
            onClick: confirmBack,
            color: 'secondary',
            style: { background: 'linear-gradient(90deg, #AC44B0, #EF429A)', margin: '0.5rem' }
          },
          'Back'
        )
      )
    ),
    React.createElement(
      Box,
      { display: 'flex', flexDirection: 'column', width: '65%', height: '60vh' },
      React.createElement('h3', { style: { fontFamily: 'Arimo' } }, 'Code'),
      React.createElement(TextareaAutosize, {
        'aria-label': 'coding pad',
        placeholder: 'Type something...',
        value: codingPadInput,
        style: { width: '100%', height: '85%' },
        onChange: (e) =>
          socket.emit('send-coding-pad-input', { roomId, codingPadInput: e.target.value })
      })
    ),
    React.createElement(
      Dialog,
      { open: dialogOpen, onClose: onCloseDialog },
      React.createElement(DialogTitle, null, dialogDetails.title),
      React.createElement(
        DialogContent,
        null,
        React.createElement(DialogContentText, null, dialogDetails.message)
      ),
      dialogDetails.button &&
        React.createElement(
          Box,
          { display: 'flex', justifyContent: 'center' },
          React.createElement(
            Button,
            {
              variant: 'outlined',
              color: 'secondary',
              onClick: handleBack,
              sx: {
                background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
                margin: '0.5rem',
                width: '40%'
              }
            },
            'Yes'
          ),
          React.createElement(
            Button,
            {
              variant: 'outlined',
              color: 'secondary',
              onClick: onCloseDialog,
              sx: {
                background: 'linear-gradient(90deg, #EF429A, #AC44B0)',
                margin: '0.5rem',
                width: '40%'
              }
            },
            'No'
          )
        )
    )
  );
}
export default LobbyPage;
