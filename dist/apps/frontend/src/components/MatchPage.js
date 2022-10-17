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
  socket.on('match-found', (concatenatedIds) => {
    console.log(`Concatenated IDs: ${concatenatedIds}`);
    setIsMatching(false);
    // Pass unique ID to be used as a socket room for collaboration and chat messages
    navigate('../lobby', { state: { roomId: concatenatedIds } });
  });
  socket.on('server-no-match-found', () => {
    setWasNotMatchFound(true);
    console.log('No match found');
  });
  return React.createElement(
    Box,
    {
      className: 'Settings',
      width: '90%',
      height: '90%',
      bgcolor: 'primary.light',
      gridRow: 2,
      borderRadius: '10px',
      padding: '5%',
      display: 'flex'
    },
    React.createElement(
      Box,
      {
        display: 'flex',
        width: '50%',
        className: 'Logo',
        justifyContent: 'center',
        alignItems: 'center'
      },
      React.createElement(Logo, null)
    ),
    React.createElement(
      Box,
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
      },
      React.createElement(
        Typography,
        { variant: 'h3', marginBottom: '2rem', width: '75%', textAlign: 'center' },
        'Select Difficulty'
      ),
      React.createElement(
        FormControl,
        { sx: { width: '75%', paddingBottom: '2rem' } },
        React.createElement(
          RadioGroup,
          {
            defaultValue: DIFFICULTY.EASY,
            value: difficulty,
            name: 'radio-buttons-group',
            onChange: (e) => setDifficulty(e.target.value)
          },
          React.createElement(FormControlLabel, {
            value: DIFFICULTY.EASY,
            control: React.createElement(Radio, null),
            label: DIFFICULTY.EASY,
            sx: { width: '75%' }
          }),
          React.createElement(FormControlLabel, {
            value: DIFFICULTY.MEDIUM,
            control: React.createElement(Radio, null),
            label: DIFFICULTY.MEDIUM,
            sx: { width: '75%' }
          }),
          React.createElement(FormControlLabel, {
            value: DIFFICULTY.HARD,
            control: React.createElement(Radio, null),
            label: DIFFICULTY.HARD,
            sx: { width: '75%' }
          })
        )
      ),
      React.createElement(
        Button,
        {
          variant: 'contained',
          onClick: matchUser,
          style: {
            color: 'white',
            borderColor: 'white',
            background: 'linear-gradient(90deg, #AC44B0, #EF429A)',
            width: '75%'
          }
        },
        'Match'
      ),
      React.createElement(
        Dialog,
        { open: isMatching, onClose: onCancelMatching },
        React.createElement(DialogTitle, null, 'Matching User'),
        React.createElement(
          DialogContent,
          null,
          React.createElement(
            CountdownCircleTimer,
            {
              isPlaying: isMatching,
              duration: 30,
              colors: ['#004777', '#F7B801', '#A30000', '#A30000'],
              colorsTime: [25, 15, 5, 0],
              onComplete: onNoMatchFound
            },
            ({ remainingTime }) => remainingTime
          )
        ),
        React.createElement(
          DialogActions,
          null,
          React.createElement(
            Button,
            { onClick: onCancelMatching, style: { color: '#AC44B0' } },
            'Cancel'
          )
        )
      ),
      React.createElement(
        Dialog,
        { open: wasMatchNotFound, onClose: () => setWasNotMatchFound(false) },
        React.createElement(DialogTitle, null, 'No Match Found'),
        React.createElement(
          DialogActions,
          null,
          React.createElement(
            Button,
            { onClick: () => setWasNotMatchFound(false), style: { color: '#AC44B0' } },
            'OK'
          )
        )
      )
    )
  );
}
export default DifficultySelectPage;
