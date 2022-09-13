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
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

const socket = io('http://localhost:8001');

const DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
};

function DifficultySelectPage() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);
  const [isMatching, setIsMatching] = useState(false);
  const [wasMatchNotFound, setWasNotMatchFound] = useState(false);
  const navigate = useNavigate();

  const matchUser = () => {
    setIsMatching(true);
    console.log(`Selected difficulty ${difficulty}`);
    socket.emit('find-match', { difficulty: difficulty.toLowerCase() });
  };

  const onCancelMatching = () => {
    setIsMatching(false);
    socket.emit('cancel-match');
  };

  const onNoMatchFound = () => {
    setIsMatching(false);
    socket.emit('no-match-found');
  };

  socket.on('match-found', (concatenatedIds: string) => {
    console.log(`Concatenated IDs: ${concatenatedIds}`);
    setIsMatching(false);
    // Pass unique ID to be used as a socket room for collaboration and chat messages
    navigate('../lobby', { state: { roomId: concatenatedIds } });
  });

  socket.on('server-no-match-found', () => {
    setWasNotMatchFound(true);
    console.log('No match found');
  });

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      width={'90%'}
      alignItems={'center'}
      fontFamily={'Arimo'}
      borderRadius={'10px'}
      padding={'5%'}
      style={{ backgroundColor: 'white' }}
    >
      <Box display={'flex'} width={'50%'}>
        <Logo />
      </Box>
      <Box display={'flex'} flexDirection={'column'} width={'50%'} alignItems={'center'}>
        <Typography variant={'h3'} marginBottom={'2rem'} width={'85%'} textAlign={'center'}>
          Select Difficulty
        </Typography>
        <FormControl sx={{ width: '85%', paddingBottom: '2rem' }}>
          <RadioGroup
            defaultValue={DIFFICULTY.EASY}
            value={difficulty}
            name="radio-buttons-group"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <FormControlLabel
              value={DIFFICULTY.EASY}
              control={<Radio />}
              label={DIFFICULTY.EASY}
              sx={{ width: '85%' }}
            />
            <FormControlLabel
              value={DIFFICULTY.MEDIUM}
              control={<Radio />}
              label={DIFFICULTY.MEDIUM}
              sx={{ width: '85%' }}
            />
            <FormControlLabel
              value={DIFFICULTY.HARD}
              control={<Radio />}
              label={DIFFICULTY.HARD}
              sx={{ width: '85%' }}
            />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          onClick={matchUser}
          style={{
            color: 'white',
            borderColor: 'white',
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
            width: '85%'
          }}
        >
          Match
        </Button>

        <Dialog open={isMatching} onClose={onCancelMatching}>
          <DialogTitle>Matching User</DialogTitle>
          <DialogContent>
            <CountdownCircleTimer
              isPlaying={isMatching}
              duration={30}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[25, 15, 5, 0]}
              onComplete={onNoMatchFound}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancelMatching} style={{ color: '#AC44B0' }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={wasMatchNotFound} onClose={() => setWasNotMatchFound(false)}>
          <DialogTitle>No Match Found</DialogTitle>
          <DialogActions>
            <Button onClick={() => setWasNotMatchFound(false)} style={{ color: '#AC44B0' }}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default DifficultySelectPage;
