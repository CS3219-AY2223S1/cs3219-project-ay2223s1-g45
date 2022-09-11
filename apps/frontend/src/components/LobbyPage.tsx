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
    <Box>
      <Button variant="contained" onClick={() => navigate('../difficulty-select')}>
        Back to Difficulty Select Page;
      </Button>

      <Input
        value={chatMessageInput}
        onChange={(e) => {
          setChatMessageInput(e.target.value);
        }}
      />
      <Button onClick={onSendMessage}>Send</Button>

      <h3>Chat messages</h3>
      <List>
        {allChatMessages.map((chatMessage, i) => {
          return <ListItem key={i}>{chatMessage}</ListItem>;
        })}
      </List>

      <h3>Code</h3>
      <TextareaAutosize
        aria-label="coding pad"
        placeholder="Type something..."
        value={codingPadInput}
        style={{ width: 800, height: 500 }}
        onChange={(e) =>
          socket.emit('send-coding-pad-input', { roomId, codingPadInput: e.target.value })
        }
      />
    </Box>
  );
}

export default LobbyPage;
