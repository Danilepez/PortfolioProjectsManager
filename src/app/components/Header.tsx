'use client';

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Typography, Box, Container } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '1px solid #ddd' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: '#333',
              textDecoration: 'none',
              fontSize: '1.5rem',
            }}
          >
            Administrador de Proyectos
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} href="/" sx={{ color: '#333', textTransform: 'none' }}>
              Inicio
            </Button>
            <Button component={Link} href="/projects" sx={{ color: '#333', textTransform: 'none' }}>
              Proyectos
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
