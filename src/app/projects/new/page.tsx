'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Alert, Button, Box } from '@mui/material';
import ProjectForm from '../../components/ProjectForm';
import api from '@/lib/api';
import { ProjectFormData } from '@/types/project';

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      const res = await api.post('/projects', data);
      if (res.data.success) router.push('/projects');
      else setError('No se pudo crear el proyecto.');
    } catch {
      setError('Error inesperado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, backgroundColor: '#fff' }}>
      <Typography variant="h4" gutterBottom>
        Nuevo Proyecto
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <Box sx={{ mt: 2 }}>
        <ProjectForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Box>
      <Box mt={2}>
        <Button variant="outlined" onClick={() => router.push('/projects')}>
          Cancelar
        </Button>
      </Box>
    </Container>
  );
}
