import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8001');

const DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
};

function DifficultySelectPage() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);

  const matchUser = () => {
    console.log(`Selected difficulty ${difficulty}`);
    socket.emit('select-difficulty', { difficulty: difficulty.toLowerCase() });
  };

  socket.on('match-found', (matchedId: string) => {
    console.log(`My id: ${socket.id}, partner id: ${matchedId}`);
  });

  return (
    <Box display={'flex'} flexDirection={'column'} width={'30%'}>
      <Typography variant={'h3'} marginBottom={'2rem'}>
        Select Difficulty
      </Typography>
      <FormControl>
        <RadioGroup
          defaultValue={DIFFICULTY.EASY}
          value={difficulty}
          name="radio-buttons-group"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <FormControlLabel value={DIFFICULTY.EASY} control={<Radio />} label={DIFFICULTY.EASY} />
          <FormControlLabel
            value={DIFFICULTY.MEDIUM}
            control={<Radio />}
            label={DIFFICULTY.MEDIUM}
          />
          <FormControlLabel value={DIFFICULTY.HARD} control={<Radio />} label={DIFFICULTY.HARD} />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" onClick={matchUser}>
        Match
      </Button>
    </Box>
  );
}

export default DifficultySelectPage;
