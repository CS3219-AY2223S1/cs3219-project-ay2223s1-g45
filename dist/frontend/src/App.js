import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import { Box } from '@mui/material';
import React from 'react';
function App() {
  return React.createElement(
    'div',
    { className: 'App' },
    React.createElement(
      Box,
      { display: 'flex', flexDirection: 'column', padding: '4rem' },
      React.createElement(
        Router,
        null,
        React.createElement(
          Routes,
          null,
          React.createElement(Route /*exact*/, {
            path: '/',
            element: React.createElement(Navigate, { replace: true, to: '/signup' })
          }),
          React.createElement(Route, {
            path: '/signup',
            element: React.createElement(SignupPage, null)
          })
        )
      )
    )
  );
}
export default App;
