'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter, useParams } from 'next/navigation';
import { 
  Button, Container, Typography, CircularProgress, Alert 
} from '@mui/material';
import ProjectForm from '../../../components/ProjectForm';
import api from '@/lib/api';
import { Project, ProjectFormData } from '@/types/project';

const EditProjectPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Cargar datos del proyecto
  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await api.get(`/projects/${id}`);
          
          if (response.data.success) {
            setProject(response.data.data);
          } else {
            setError('Project not found');
          }
        } catch (err) {
          console.error('Error fetching project:', err);
          setError('Failed to load project. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchProject();
  }, [id]);

  const handleSubmit = async (formData: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      
      const response = await api.put(`/projects/${id}`, formData);
      
      if (response.data.success) {
        router.push('/projects');
      } else {
        setError('Failed to update project. Please try again.');
      }
    } catch (err) {
      console.error('Error updating project:', err);
      setError('An unexpected error occurred. Please try again.');
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

  if (error || !project) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Project not found'}
        </Alert>
        <Button variant="outlined" onClick={() => router.push('/projects')}>
          Back to Projects
        </Button>
      </Container>
    );
  }

  // Preparar datos iniciales para el formulario
  const initialFormData: ProjectFormData = {
    title: project.title,
    description: project.description,
    url: project.url,
    technologies: project.technologies,
  };

  return (
    <>
      <Head>
        <title>Edit Project</title>
        <meta name="description" content="Edit a portfolio project" />
      </Head>
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Project
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <ProjectForm 
          initialData={initialFormData} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </Container>
    </>
  );
};

export default EditProjectPage;