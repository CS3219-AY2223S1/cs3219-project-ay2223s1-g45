import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import SettingsPage from './components/SettingsPage';
import DifficultySelectPage from './components/DifficultySelectPage';
import { Box } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Box display={'flex'} flexDirection={'column'} padding={'4rem'}>
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
