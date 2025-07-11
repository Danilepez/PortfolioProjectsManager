'use client';

import React from 'react';
import { Box, Typography, Autocomplete, Chip, TextField } from '@mui/material';

interface TechnologyFilterProps {
  technologies: string[];
  selectedTech: string[];
  onTechChange: (tech: string[]) => void;
}

export default function TechnologyFilter({
  technologies,
  selectedTech,
  onTechChange
}: TechnologyFilterProps) {
  return (
    <Box sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="subtitle1" gutterBottom>
        Filtrar por tecnología
      </Typography>
      <Autocomplete
        multiple
        options={technologies}
        value={selectedTech}
        onChange={(_, value) => onTechChange(value)}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} key={option} />
          ))
        }
        renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Añadir o seleccionar tech" />}
      />
    </Box>
  );
}
