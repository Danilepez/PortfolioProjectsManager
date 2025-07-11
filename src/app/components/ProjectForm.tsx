'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  IconButton,
  Chip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import { ProjectFormData } from '@/types/project';

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  isSubmitting: boolean;
}

export default function ProjectForm({
  initialData,
  onSubmit,
  isSubmitting,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    url: '',
    technologies: [],
    ...initialData,
  });
  const [techInput, setTechInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTech = () => {
    const t = techInput.trim();
    if (t && !formData.technologies.includes(t)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, t],
      }));
      setTechInput('');
    }
  };

  const handleDeleteTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((x) => x !== tech),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
        />
        <TextField
          label="URL del proyecto"
          name="url"
          value={formData.url}
          onChange={handleChange}
          fullWidth
          required
        />
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Tecnologías
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Agregar tecnología"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTech();
                }
              }}
              size="small"
            />
            <IconButton onClick={handleAddTech}>
              <AddIcon color="primary" />
            </IconButton>
          </Stack>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.technologies.map((tech) => (
              <Chip key={tech} label={tech} onDelete={() => handleDeleteTech(tech)} />
            ))}
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            startIcon={initialData ? <SaveIcon /> : <SendIcon />}
            disabled={isSubmitting}
          >
            {initialData ? 'Guardar' : 'Crear'}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
