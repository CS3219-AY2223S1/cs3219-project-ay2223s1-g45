import { Box } from '@mui/material';
import { Logo } from './Logo';
import { Form } from './Form';

export default function LoginPage2() {
  return (
    <Box
      className="Login"
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
        title={'Log In'}
        fields={[
          { label: 'Username', variant: 'standard', required: true, autoFocus: true },
          { label: 'Password', variant: 'standard', required: true, autoFocus: false }
        ]}
        link={{ path: '/signup', message: "Don't have an account? Sign Up." }}
      />
    </Box>
  );
}
