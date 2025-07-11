'use client';

import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 10, textAlign: 'center', backgroundColor: '#fff' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
          Bienvenido al Administrador de Proyectos
        </Typography>

        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
          Organiza, edita y presenta tus proyectos de forma profesional.
        </Typography>

        <Link href="/projects" passHref>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              borderColor: '#333',
              color: '#333',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#000',
              },
            }}
          >
            Ver Proyectos
          </Button>
        </Link>
      </motion.div>
    </Container>
  );
}
