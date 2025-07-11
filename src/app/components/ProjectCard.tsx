'use client';

import React from 'react';
import { Project } from '@/types/project';
import { 
  Card, CardContent, CardActions, 
  Typography, Button, Chip, Stack, Box
} from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {project.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {project.description}
        </Typography>
        
        <Box sx={{ my: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Created: {format(new Date(project.createdAt), 'MMM dd, yyyy')}
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
          {project.technologies.map((tech, index) => (
            <Chip key={index} label={tech} size="small" />
          ))}
        </Stack>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button 
          size="small" 
          color="primary" 
          href={project.url} 
          target="_blank"
          rel="noopener"
        >
          View Project
        </Button>
        
        <Box>
          <Link href={`/projects/${project._id}/edit`} passHref>
            <Button size="small" color="secondary" sx={{ mr: 1 }}>
              Edit
            </Button>
          </Link>
          
          <Button 
            size="small" 
            color="error" 
            onClick={() => onDelete(project._id)}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;