import { Box, Button, Input, List, ListItem, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:8002');

function LobbyPage() {
  const [codingPadInput, setCodingPadInput] = useState('');
  const [chatMessageInput, setChatMessageInput] = useState('');
  const [allChatMessages, setAllChatMessages] = useState<string[]>([]);

  const navigate = useNavigate();
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
      height={'60vh'}
      alignItems={'center'}
      fontFamily={'Arimo'}
      borderRadius={'10px'}
      padding={'5%'}
      style={{ backgroundColor: 'white' }}
    >
      <Box display={'flex'} flexDirection={'column'} padding={'5px'} width={'35%'} height={'100%'}>
        <Box display={'flex'} flexDirection={'column'} width={'85%'} height={'90%'}>
          <h3 style={{ fontFamily: 'Arimo' }}>Chat</h3>
          <List sx={{ height: '90%', overflowY: 'auto' }}>
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
          />
          <Button onClick={onSendMessage} style={{ color: '#AC44B0' }}>
            Send
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate('../match')}
          style={{
            width: '85%',
            color: 'white',
            borderColor: 'white',
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)'
          }}
        >
          Back
        </Button>
      </Box>

      <Box display={'flex'} flexDirection={'column'} width={'65%'} height={'100%'}>
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
    </Box>
  );
}

export default LobbyPage;
