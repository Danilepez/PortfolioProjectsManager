'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { Container, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import ProjectForm from '../../components/ProjectForm';
import api from '@/lib/api';
import { ProjectFormData } from '@/types/project';

const NewProjectPage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      
      const response = await api.post('/projects', formData);
      
      if (response.data.success) {
        router.push('/projects');
      } else {
        setError('Failed to create project. Please try again.');
      }
    } catch (err) {
      console.error('Error creating project:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add New Project</title>
        <meta name="description" content="Add a new portfolio project" />
      </Head>
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Project
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <ProjectForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </Container>
    </>
  );
};

export default NewProjectPage;