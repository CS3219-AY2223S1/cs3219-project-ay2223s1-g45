import { Box } from '@mui/material';
import { pages } from '../constants';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const numPages = pages.length;
const getWidth = (numPages) => {
  return `${100 / numPages}%`;
};
export default function NavigationBar({ gridRowStart }) {
  const { isAuthenticated } = useAuth();
  return (
    isAuthenticated &&
    React.createElement(
      Box,
      { style: { background: '#faf3f7', gridRowStart: gridRowStart }, display: 'flex' },
      React.createElement(
        'style',
        null,
        `   
            .navBarItem:hover {
                background: linear-gradient(90deg, #f0d8e5, white);
            }
        `
      ),
      pages.map((page, index) =>
        React.createElement(
          Box,
          {
            key: index,
            width: getWidth(numPages),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            className: 'navBarItem'
          },
          React.createElement(
            Link,
            {
              to: `.${page.route}`,
              style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                fontFamily: 'Arimo',
                fontSize: '1.5rem',
                textDecoration: 'none',
                color: 'secondary'
              }
            },
            page.name
          )
        )
      )
    )
  );
}
