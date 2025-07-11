'use client';

import React from 'react';
import { 
  Box, Button, Typography, Chip, FormControl, 
  InputLabel, Select, MenuItem, OutlinedInput
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

interface TechnologyFilterProps {
  technologies: string[];
  selectedTech: string[];
  onTechChange: (tech: string[]) => void;
}

const TechnologyFilter: React.FC<TechnologyFilterProps> = ({ 
  technologies, 
  selectedTech, 
  onTechChange 
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
        Filter by Technology
      </Typography>
      
      <FormControl fullWidth sx={{ maxWidth: 500 }}>
        <InputLabel id="tech-filter-label">Select technologies</InputLabel>
        <Select
          labelId="tech-filter-label"
          multiple
          value={selectedTech}
          onChange={(e) => onTechChange(e.target.value as string[])}
          input={<OutlinedInput label="Select technologies" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {technologies.map((tech) => (
            <MenuItem key={tech} value={tech}>
              {tech}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {selectedTech.length > 0 && (
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Active filters:
          </Typography>
          {selectedTech.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              onDelete={() => onTechChange(selectedTech.filter(t => t !== tech))}
              deleteIcon={<CancelIcon />}
              variant="outlined"
              sx={{ mr: 1 }}
            />
          ))}
          <Button 
            size="small" 
            color="secondary"
            onClick={() => onTechChange([])}
            sx={{ ml: 'auto' }}
          >
            Clear all
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TechnologyFilter;