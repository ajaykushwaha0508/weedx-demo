import React from 'react';
import { Box, Typography } from '@mui/material';

const Bgheader = ({ text }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5', // Background color for the header
        padding: '20px',
        textAlign: 'center', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: '#333', // Text color
          // fontWeight: 'bold',
          fontSize: '2.5rem', // Font size for large header
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Bgheader;
