'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Button, Box, Skeleton, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import TechnologyFilter from '../components/TechnologyFilter';
import api from '@/lib/api';
import { Project } from '@/types/project';

export default function ProjectListPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const allTech = useMemo(() => {
    const s = new Set<string>();
    projects.forEach(p => p.technologies.forEach(t => s.add(t)));
    return Array.from(s).sort();
  }, [projects]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get('/projects');
        setProjects(res.data.data);
        setError('');
      } catch {
        setError('Error al cargar proyectos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    let datos = projects;
    if (searchTerm) {
      datos = datos.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedTech.length > 0) {
      datos = datos.filter(p =>
        selectedTech.every(t => p.technologies.includes(t))
      );
    }
    setFiltered(datos);
  }, [projects, searchTerm, selectedTech]);

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setDeleteId(null);
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/projects/${deleteId}`);
      setProjects(prev => prev.filter(p => p._id !== deleteId));
      setError('');
    } catch {
      setError('No se pudo eliminar');
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#fff', minHeight: 'calc(100vh - 64px)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Mis Proyectos
        </Typography>
        <Button variant="contained" onClick={() => router.push('/projects/new')}>
          + Nuevo Proyecto
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TechnologyFilter technologies={allTech} selectedTech={selectedTech} onTechChange={setSelectedTech} />

      {loading ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width={300} height={200} />
          ))}
        </Box>
      ) : filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron proyectos
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          <AnimatePresence>
            {filtered.map((p, idx) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProjectCard
                  project={p}
                  onDelete={() => openDeleteDialog(p._id)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      )}

      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este proyecto?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
