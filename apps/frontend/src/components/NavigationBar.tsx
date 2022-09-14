import { Box } from '@mui/material';
import { pages } from '../constants';
import { Link } from 'react-router-dom';
import { colorScheme } from '../constants';
import { useAuth } from '../context/AuthContext';

export type NavigationBarProps = {
  gridRowStart: number;
};

const numPages = pages.length;
const getWidth = (numPages: number) => {
  return `${100 / numPages}%`;
};

export default function NavigationBar({ gridRowStart }: NavigationBarProps) {
  const { isAuthenticated } = useAuth();
  return (
    isAuthenticated && (
      <Box style={{ background: '#faf3f7', gridRowStart: gridRowStart }} display="flex">
        <style>
          {`   
            .navBarItem:hover {
                background: linear-gradient(90deg, #f0d8e5, white);
            }
        `}
        </style>
        {pages.map((page, index) => (
          <Box
            key={index}
            width={getWidth(numPages)}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            className={'navBarItem'}
          >
            <Link
              to={`.${page.route}`}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                fontFamily: 'Arimo',
                fontSize: '1.5rem',
                textDecoration: 'none',
                color: `${colorScheme.primary}`
              }}
            >
              {page.name}
            </Link>
          </Box>
        ))}
      </Box>
    )
  );
}
