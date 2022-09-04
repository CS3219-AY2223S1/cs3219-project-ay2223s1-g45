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
import React from 'react';

const DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
};

function DifficultySelectPage() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);

  const handleDifficultyLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty((event.target as HTMLInputElement).value);
  };

  const matchUser = () => {
    console.log('Matching User: ' + difficulty);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} width={'30%'}>
      <Typography variant={'h3'} marginBottom={'2rem'}>
        Select Difficulty
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={DIFFICULTY.EASY}
          value={difficulty}
          name="radio-buttons-group"
          onChange={handleDifficultyLevelChange}
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
