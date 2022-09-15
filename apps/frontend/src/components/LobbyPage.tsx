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
import type { DialogDetails } from './Form';

const socket = io('http://localhost:8002');

function LobbyPage() {
  const [codingPadInput, setCodingPadInput] = useState('');
  const [chatMessageInput, setChatMessageInput] = useState('');
  const [allChatMessages, setAllChatMessages] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [dialogDetails, setDialogDetails] = useState({
    title: '',
    message: ''
  } as DialogDetails);

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

  const confirmBack = () => {
    setDialogDetails({ message: 'Are you sure you want to leave the session?', button: true });
    setDialogOpen(true);
  };

  const handleBack = () => {
    navigate('../match');
  };

  const locationState = useLocation().state as { roomId: string };
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

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      width={'90%'}
      height={'90%'}
      alignItems={'center'}
      fontFamily={'Arimo'}
      borderRadius={'10px'}
      padding={'5%'}
      style={{ backgroundColor: 'white' }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        padding={'5px'}
        width={'35%'}
        height={'57.5vh'}
      >
        <Box display={'flex'} flexDirection={'column'} width={'85%'} height={'100%'}>
          <h3 style={{ fontFamily: 'Arimo' }}>Chat</h3>
          <List sx={{ height: '100%', overflowY: 'auto' }}>
            {allChatMessages.map((chatMessage, i) => {
              return (
                <ListItem key={i} style={{ paddingLeft: '2px' }}>
                  {chatMessage}
                </ListItem>
              );
            })}
          </List>
          <Input
            value={chatMessageInput}
            onChange={(e) => {
              setChatMessageInput(e.target.value);
            }}
            sx={{ margin: '0.5rem' }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSendMessage();
              }
            }}
          />
          <Button
            onClick={onSendMessage}
            color={'primary'}
            style={{ background: 'linear-gradient(90deg, #AC44B0, #EF429A)', margin: '0.5rem' }}
          >
            Send
          </Button>
          <Button
            onClick={confirmBack}
            color={'primary'}
            style={{ background: 'linear-gradient(90deg, #AC44B0, #EF429A)', margin: '0.5rem' }}
          >
            Back
          </Button>
        </Box>
      </Box>

      <Box display={'flex'} flexDirection={'column'} width={'65%'} height={'60vh'}>
        <h3 style={{ fontFamily: 'Arimo' }}>Code</h3>
        <TextareaAutosize
          aria-label="coding pad"
          placeholder="Type something..."
          value={codingPadInput}
          style={{ width: '100%', height: '85%' }}
          onChange={(e) =>
            socket.emit('send-coding-pad-input', { roomId, codingPadInput: e.target.value })
          }
        />
      </Box>
      <Dialog open={dialogOpen} onClose={onCloseDialog}>
        <DialogTitle>{dialogDetails.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogDetails.message}</DialogContentText>
        </DialogContent>
        {dialogDetails.button && (
          <Box display={'flex'} justifyContent={'center'}>
            <Button
              variant={'outlined'}
              color={'primary'}
              onClick={handleBack}
              sx={{
                background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
                margin: '0.5rem',
                width: '40%'
              }}
            >
              Yes
            </Button>
            <Button
              variant={'outlined'}
              color={'primary'}
              onClick={onCloseDialog}
              sx={{
                background: 'linear-gradient(90deg, #EF429A, #AC44B0)',
                margin: '0.5rem',
                width: '40%'
              }}
            >
              No
            </Button>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

export default LobbyPage;
