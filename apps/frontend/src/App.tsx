import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import SettingsPage from './components/SettingsPage';
import DifficultySelectPage from './components/DifficultySelectPage';
import { Box } from '@mui/material';

function App() {
  return (
    <div
      className="App"
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(3, 1fr)',
        maxHeight: '100vh',
        background: 'linear-gradient(90deg, #AC44B0, #EF429A)'
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        padding={'4rem'}
        alignItems={'center'}
        style={{
          gridRowStart: '2'
        }}
      >
        <Router>
          <Routes>
            <Route /*exact*/ path="/" element={<Navigate replace to="/login" />}></Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/difficulty-select" element={<DifficultySelectPage />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
