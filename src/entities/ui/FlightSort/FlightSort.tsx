import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MenuItem, Select, Stack } from '@mui/material';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';

import { setSort } from '@/features/flightSlice';
import { Button } from '@/shared/ui/Button';

type SortField = 'price' | 'airline';

export const FlightSort = () => {
  const [sortBy, setSortBy] = useState<SortField>('price');
  const dispatch = useDispatch();

  const handleSort = (flight: 'asc' | 'desc') => {
    dispatch(setSort({ sortBy, sortOrder: flight }));
  };

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      maxWidth={'300px'}
      alignItems='center'
      mx={'auto'}
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
        sx={{ ml: 2 }}
        variant='contained'
        color='primary'
        onClick={() => handleSort('asc')}
      >
        <ArrowUpward />
      </Button>
      <Button
        sx={{ ml: 2 }}
        variant='contained'
        color='primary'
        onClick={() => handleSort('desc')}
      >
        <ArrowDownward />
      </Button>
    </Stack>
  );
};
