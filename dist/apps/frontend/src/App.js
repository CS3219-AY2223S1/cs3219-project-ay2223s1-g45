import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import LobbyPage from './components/LobbyPage';
import SettingsPage from './components/SettingsPage';
import DifficultySelectPage from './components/MatchPage';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import AuthContext, { useAuth } from './context/AuthContext';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/Theme';
import ChangePassword from './components/ChangePasswordPage';
function AuthenticatedRoutes() {
  return React.createElement(
    Routes,
    null,
    React.createElement(Route, {
      path: '/',
      element: React.createElement(Navigate, { replace: true, to: '/match' })
    }),
    React.createElement(Route, {
      path: '/settings',
      element: React.createElement(SettingsPage, null)
    }),
    React.createElement(Route, {
      path: '/match',
      element: React.createElement(DifficultySelectPage, null)
    }),
    React.createElement(Route, { path: '/lobby', element: React.createElement(LobbyPage, null) }),
    React.createElement(Route, {
      path: '/change-password',
      element: React.createElement(ChangePassword, null)
    }),
    React.createElement(Route, {
      path: '*',
      element: React.createElement(Navigate, { replace: true, to: '/match' })
    })
  );
}
function UnauthenticatedRoutes() {
  return React.createElement(
    Routes,
    null,
    React.createElement(Route, {
      path: '/',
      element: React.createElement(Navigate, { replace: true, to: '/login' })
    }),
    React.createElement(Route, { path: '/signup', element: React.createElement(SignupPage, null) }),
    React.createElement(Route, { path: '/login', element: React.createElement(LoginPage, null) }),
    React.createElement(Route, {
      path: '*',
      element: React.createElement(Navigate, { replace: true, to: '/login' })
    })
  );
}
function RouterContainer() {
  const { isAuthenticated } = useAuth();
  return React.createElement(
    Router,
    null,
    React.createElement(NavigationBar, { gridRowStart: 1 }),
    React.createElement(
      Box,
      {
        display: 'flex',
        flexDirection: 'row',
        margin: '4rem',
        alignItems: 'center',
        alignSelf: 'center',
        style: {
          gridRowStart: '2'
        }
      },
      isAuthenticated
        ? React.createElement(AuthenticatedRoutes, null)
        : React.createElement(UnauthenticatedRoutes, null)
    )
  );
}
function AppContainer() {
  const { isAuthenticated } = useAuth();
  return React.createElement(
    Box,
    {
      className: 'App',
      display: 'grid',
      height: '100vh',
      gridTemplateRows: isAuthenticated ? 'auto 90%' : 'auto',
      overflow: 'hidden',
      sx: { background: 'linear-gradient(90deg, #AC44B0, #EF429A)' }
    },
    React.createElement(RouterContainer, null)
  );
}
function App() {
  return React.createElement(
    ThemeProvider,
    { theme: theme },
    React.createElement(AuthContext, null, React.createElement(AppContainer, null))
  );
}
export default App;
