import { Box } from '@mui/material';
import { Logo } from './Logo';
import { Form } from './Form';
import { useState } from 'react';

export default function SignupPage2() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box
      className="Signup"
      width="90%"
      height="90%"
      bgcolor={'primary.main'}
      gridRow={2}
      borderRadius={'10px'}
      padding={'5%'}
      display={'flex'}>
      <Box
        display={'flex'}
        width={'50%'}
        className="Logo"
        justifyContent={'center'}
        alignItems={'center'}>
        <Logo />
      </Box>
      <Form
        title={'Sign Up'}
        fields={[
          {
            label: 'Username',
            variant: 'standard',
            required: true,
            autoFocus: true,
            onChange: (event) => {
              setUsername(event.target.value);
            }
          },
          {
            label: 'Password',
            variant: 'standard',
            required: true,
            autoFocus: false,
            onChange: (event) => {
              setPassword(event.target.value);
            }
          }
        ]}
        link={{ path: '/login', message: 'Already have an account? Log In.' }}
      />
    </Box>
  );
}
