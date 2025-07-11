'use client';

import React from 'react';
import { 
  Box, Container, Typography
} from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 3, bgcolor: 'primary.main', color: 'white' }}>
      <Container maxWidth="xl">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Portfolio Manager 
          
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;