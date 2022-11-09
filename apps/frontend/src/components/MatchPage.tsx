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
import { useMatch } from '../context/MatchContext';
import { Logo } from './Logo';
import { URL_MATCHING_SVC } from '../configs';

const socket = io(`${URL_MATCHING_SVC}`);

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
  const { handleSelectedDifficulty } = useMatch();

  const matchUser = () => {
    setIsMatching(true);
    handleSelectedDifficulty(difficulty.toLowerCase());
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
      className="Settings"
      width="90%"
      height="90%"
      bgcolor={'primary.light'}
      gridRow={2}
      borderRadius={'10px'}
      padding={'5%'}
      display={'flex'}
    >
      <Box
        display={'flex'}
        width={'50%'}
        className="Logo"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Logo />
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'50%'}
      >
        <Typography variant={'h3'} marginBottom={'2rem'} width={'75%'} textAlign={'center'}>
          Select Difficulty
        </Typography>
        <FormControl sx={{ width: '75%', paddingBottom: '2rem' }}>
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
              sx={{ width: '75%' }}
            />
            <FormControlLabel
              value={DIFFICULTY.MEDIUM}
              control={<Radio />}
              label={DIFFICULTY.MEDIUM}
              sx={{ width: '75%' }}
            />
            <FormControlLabel
              value={DIFFICULTY.HARD}
              control={<Radio />}
              label={DIFFICULTY.HARD}
              sx={{ width: '75%' }}
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
            width: '75%'
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
