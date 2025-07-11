'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, bgcolor: 'primary.main', color: 'white', mt: 6 }}>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Administrador de Proyectos. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}
