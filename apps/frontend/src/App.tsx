import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import SettingsPage from './components/SettingsPage';
import DifficultySelectPage from './components/DifficultySelectPage';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import { colorScheme } from './constants';

function App() {
  return (
    <div
      className="App"
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(3, 1fr)',
        maxHeight: '100vh',
        background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.secondary})`
      }}
    >
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
          <Routes>
            <Route /*exact*/ path="/" element={<Navigate replace to="/login" />}></Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/difficulty-select" element={<DifficultySelectPage />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
