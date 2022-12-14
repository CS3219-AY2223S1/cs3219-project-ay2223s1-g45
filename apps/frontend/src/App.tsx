import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import LobbyPage from './components/LobbyPage';
import SettingsPage from './components/SettingsPage';
import DifficultySelectPage from './components/MatchPage';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import AuthContext, { useAuth } from './context/AuthContext';
import MatchContext from './context/MatchContext';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/Theme';
import ChangePassword from './components/ChangePasswordPage';

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/match" />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/match" element={<DifficultySelectPage />} />
      <Route path="/lobby" element={<LobbyPage />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="*" element={<Navigate replace to="/match" />} />
    </Routes>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />}></Route>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
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
        margin={'4rem'}
        alignItems={'center'}
        alignSelf={'center'}
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
      overflow={'hidden'}
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
        <MatchContext>
          <AppContainer />
        </MatchContext>
      </AuthContext>
    </ThemeProvider>
  );
}

export default App;
