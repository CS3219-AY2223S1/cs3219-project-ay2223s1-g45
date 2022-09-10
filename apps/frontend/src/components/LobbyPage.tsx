import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LobbyPage() {
  const navigate = useNavigate();
  return (
    <Box>
      <Button variant="contained" onClick={() => navigate('../difficulty-select')}>
        Back to Difficulty Select Page
      </Button>
    </Box>
  );
}

export default LobbyPage;
