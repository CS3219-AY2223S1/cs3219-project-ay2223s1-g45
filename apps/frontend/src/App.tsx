import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import SettingsPage from './components/SettingsPage';
import DifficultySelectPage from './components/DifficultySelectPage';
import LobbyPage from './components/LobbyPage';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import { colorScheme } from './constants';
import AuthContext, { useAuth } from './context/AuthContext';

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route /*exact*/ path="/" element={<Navigate replace to="/settings" />}></Route>
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/difficulty-select" element={<DifficultySelectPage />} />
      <Route path="/lobby" element={<LobbyPage />} />
      <Route path="*" element={<Navigate replace to="/settings"/>} />
    </Routes>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route /*exact*/ path="/" element={<Navigate replace to="/login" />}></Route>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate replace to="/login"/>} />
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
        }}>
        {isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      </Box>
    </Router>
  );
}

function App() {
  return (
    <AuthContext>
      <div
        className="App"
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, 1fr)',
          maxHeight: '100vh',
          background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`
        }}>
        <RouterContainer />
      </div>
    </AuthContext>
  );
}

export default App;
