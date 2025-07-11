'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Container, Typography, Alert, Button, Box, CircularProgress } from '@mui/material';
import ProjectForm from '../../../components/ProjectForm';
import api from '@/lib/api';
import { Project, ProjectFormData } from '@/types/project';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams() as Record<string, string | string[]>;
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          setLoading(true);
          const res = await api.get(`/projects/${id}`);
          if (res.data.success) setProject(res.data.data);
          else setError('Proyecto no encontrado');
        } catch {
          setError('Error al cargar el proyecto.');
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [id]);

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      const res = await api.put(`/projects/${id}`, data);
      if (res.data.success) router.push('/projects');
      else setError('Error al actualizar el proyecto.');
    } catch {
      setError('Error inesperado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!project || error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Proyecto no encontrado'}
        </Alert>
        <Button variant="outlined" onClick={() => router.push('/projects')}>
          Volver a Proyectos
        </Button>
      </Container>
    );
  }

  const initialData: ProjectFormData = {
    title: project.title,
    description: project.description,
    url: project.url,
    technologies: project.technologies,
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, backgroundColor: '#fff' }}>
      <Typography variant="h4" gutterBottom>
        Editar Proyecto
      </Typography>
      <Box sx={{ mt: 2 }}>
        <ProjectForm initialData={initialData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Box>
    </Container>
  );
}
