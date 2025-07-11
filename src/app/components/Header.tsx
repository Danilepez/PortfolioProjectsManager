'use client';

import React from 'react';
import { 
  AppBar, Toolbar, Typography, 
  Button, Container, Box
} from '@mui/material';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              Portfolio Manager
            </Link>
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              component={Link}
              href="/projects"
            >
              Projects
            </Button>
            <Button 
              color="inherit" 
              component={Link}
              href="/projects/new"
            >
              Add Project
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;