import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage2 from './components/SignupPage';
import LoginPage2 from './components/LoginPage';
import LobbyPage from './components/LobbyPage';
import SettingsPage from './components/SettingsPage';
import DifficultySelectPage from './components/MatchPage';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import AuthContext, { useAuth } from './context/AuthContext';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/Theme';

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/settings" />}></Route>
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/match" element={<DifficultySelectPage />} />
      <Route path="/lobby" element={<LobbyPage />} />
      <Route path="*" element={<Navigate replace to="/settings" />} />
    </Routes>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />}></Route>
      <Route path="/signup" element={<SignupPage2 />} />
      <Route path="/login" element={<LoginPage2 />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

function RouterContainer() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <NavigationBar gridRowStart={1} />
      <Box
        display={'flex'}
        flexDirection={'row'}
        padding={'4rem'}
        alignItems={'center'}
        style={{
          gridRowStart: '2'
        }}
      >
        {isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      </Box>
    </Router>
  );
}

function AppContainer() {
  const { isAuthenticated } = useAuth();

  return (
    <Box
      className="App"
      display={'grid'}
      height={'100vh'}
      gridTemplateRows={isAuthenticated ? 'auto 90%' : 'auto'}
      sx={{ background: 'linear-gradient(90deg, #AC44B0, #EF429A)' }}
    >
      <RouterContainer />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext>
        <AppContainer />
      </AuthContext>
    </ThemeProvider>
  );
}

export default App;
