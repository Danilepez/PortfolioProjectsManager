'use client';

import React, { useState } from 'react';
import { 
  TextField, Button, Box, 
  Chip, Stack, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProjectFormData } from '@/types/project';

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  isSubmitting: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  initialData, 
  onSubmit, 
  isSubmitting 
}) => {
  const [formData, setFormData] = useState<ProjectFormData>(initialData || {
    title: '',
    description: '',
    url: '',
    technologies: [],
  });
  
  const [newTech, setNewTech] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTech = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          required
          label="Project Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        
        <TextField
          fullWidth
          required
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
        />
        
        <TextField
          fullWidth
          required
          label="Project URL"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          placeholder="https://example.com"
        />
        
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
            Technologies
          </Typography>
          
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="Add technology"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTech();
                }
              }}
            />
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />} 
              onClick={handleAddTech}
              disabled={!newTech.trim()}
              sx={{ minWidth: '120px' }}
            >
              Add
            </Button>
          </Stack>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {formData.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                onDelete={() => handleRemoveTech(tech)}
                deleteIcon={<DeleteIcon />}
              />
            ))}
          </Box>
        </Box>
      </Stack>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="outlined" 
          color="secondary" 
          href="/projects"
          LinkComponent="a"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={isSubmitting}
        >
          {initialData ? 'Update Project' : 'Create Project'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectForm;