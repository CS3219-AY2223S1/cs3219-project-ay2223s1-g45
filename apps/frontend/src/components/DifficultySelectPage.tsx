import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { useState } from 'react';
import io from 'socket.io-client';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const socket = io('http://localhost:8001');

const DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
};

function DifficultySelectPage() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);
  const [isMatching, setIsMatching] = useState(false);

  const matchUser = () => {
    setIsMatching(true);
    console.log(`Selected difficulty ${difficulty}`);
    socket.emit('select-difficulty', { difficulty: difficulty.toLowerCase() });
  };

  socket.on('match-found', (matchedId: string) => {
    console.log(`My id: ${socket.id}, partner id: ${matchedId}`);
    setIsMatching(false);
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

      <Dialog open={isMatching} onClose={() => setIsMatching(false)}>
        <DialogTitle>Matching User</DialogTitle>
        <DialogContent>
          <CountdownCircleTimer
            isPlaying={isMatching}
            duration={30}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[25, 15, 5, 0]}
            // onComplete={() => setIsMatching(false)}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsMatching(false)} style={{ color: '#AC44B0' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DifficultySelectPage;
