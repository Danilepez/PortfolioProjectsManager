'use client';

import React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar proyectos..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <ClearIcon color="action" sx={{ cursor: 'pointer' }} onClick={() => onSearchChange('')} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'box-shadow 0.3s',
            '&.Mui-focused': {
              boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`
            }
          }
        }}
      />
    </Box>
  );
}
