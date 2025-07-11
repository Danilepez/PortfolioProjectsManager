'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Container, Typography, Button, 
  Box, CircularProgress, Alert 
} from '@mui/material';
import { useRouter } from 'next/navigation'; 
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import TechnologyFilter from '../components/TechnologyFilter';
import api from '@/lib/api';
import { Project } from '@/types/project';

export default function ProjectListPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get('/projects');
        setProjects(response.data.data);
        setError('');
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term)
      );
    }
    
    if (selectedTech.length > 0) {
      result = result.filter(project => 
        selectedTech.every(tech => project.technologies.includes(tech))
      );
    }
    
    setFilteredProjects(result);
  }, [projects, searchTerm, selectedTech]);

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        setProjects(prev => prev.filter(project => project._id !== id));
      } catch (err) {
        console.error('Error deleting project:', err);
        setError('Failed to delete project. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Portfolio Projects
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/projects/new')}
        >
          Add New Project
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <TechnologyFilter 
        technologies={allTechnologies} 
        selectedTech={selectedTech} 
        onTechChange={setSelectedTech} 
      />
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredProjects.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No projects found
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setSelectedTech([]);
            }}
          >
            Clear Filters
          </Button>
        </Box>
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 3 
        }}>
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project._id}
              project={project} 
              onDelete={handleDeleteProject} 
            />
          ))}
        </Box>
      )}
    </Container>
  );
}