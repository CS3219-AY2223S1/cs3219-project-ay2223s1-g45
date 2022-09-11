import { Box, Button, Input, List, ListItem } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:8002');

function LobbyPage() {
  const [chatMessageInput, setChatMessageInput] = useState('');
  const [allChatMessages, setAllChatMessages] = useState<string[]>([]);

  const navigate = useNavigate();
  const locationState = useLocation().state as { chatRoomId: string };
  const chatRoomId = locationState.chatRoomId;
  socket.emit('join-chat-room', chatRoomId);

  const onSendMessage = () => {
    if (!chatMessageInput) {
      return;
    }

    socket.emit('send-chat-message', { message: chatMessageInput, chatRoomId });
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

      <List>
        {allChatMessages.map((chatMessage, i) => {
          return <ListItem key={i}>{chatMessage}</ListItem>;
        })}
      </List>
    </Box>
  );
}

export default LobbyPage;
