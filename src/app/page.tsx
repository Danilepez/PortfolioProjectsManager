// src/app/page.tsx
'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Portfolio Manager
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" paragraph>
          Manage your portfolio projects with ease.
        </Typography>
        <Link href="/projects" passHref>
          <Button variant="contained" color="primary">
            View Projects
          </Button>
        </Link>
      </Box>
    </Container>
  );
}