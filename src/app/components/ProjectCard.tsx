'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import { format } from 'date-fns';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <Card
      sx={{
        width: 300,
        mb: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {project.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Created: {format(new Date(project.createdAt), 'MMM dd, yyyy')}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
          {project.technologies.map((tech) => (
            <Chip key={tech} label={tech} size="small" />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', px: 1, pb: 1 }}>
        <IconButton
          component="a"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View"
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          component={Link}
          href={`/projects/${project._id}/edit`}
          aria-label="Edit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => onDelete(project._id)}
          aria-label="Delete"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
