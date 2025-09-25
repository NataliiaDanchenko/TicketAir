import { useState, useEffect } from 'react';
import { Select, MenuItem, Stack, Button } from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

export type SortField = 'price' | 'airline';

export interface FlightSortProps {
  currentSortBy: SortField;
  currentSortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: SortField, sortOrder: 'asc' | 'desc') => void;
}


export const FlightSort = ({
  currentSortBy,
  onSortChange,
}: FlightSortProps) => {
  const [sortBy, setSortBy] = useState<SortField>(currentSortBy);

  useEffect(() => {
    setSortBy(currentSortBy);
  }, [currentSortBy]);

  const handleSort = (order: 'asc' | 'desc') => {
    onSortChange(sortBy, order);
  };

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      maxWidth={350}
      alignItems='center'
      mx='auto'
      py={2}
      px={6}
      width='100%'
    >
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortField)}
        size='small'
      >
        <MenuItem value='price'>Price</MenuItem>
        <MenuItem value='airline'>Airline</MenuItem>
      </Select>
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleSort('asc')}
      >
        <ArrowUpward />
      </Button>
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleSort('desc')}
      >
        <ArrowDownward />
      </Button>
    </Stack>
  );
};
