import React from 'react';
import Box from '@mui/material/Box';

interface ScrollableContainerProps {
  children: React.ReactNode;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      overflow="auto"
      padding={2}
      gap={'10px'}
      sx={{
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollableContainer;
