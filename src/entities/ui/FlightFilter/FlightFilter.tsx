import { useState, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container, TextField, Alert, Stack } from '@mui/material';

import { setSearchQuery } from '@/features/flightSlice';
import { Button } from '@/shared/ui/Button';

export const FlightFilter = () => {
  const [addQuery, setAddQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddQuery(e.target.value);
  };

  const handleSearchTodo = () => {
    if (!addQuery.trim()) {
      setErrorMessage('Search query cannot be empty');
      return;
    }

    setErrorMessage(null);
    dispatch(setSearchQuery(addQuery.trim()));
  };

  const handleClear = () => {
    setAddQuery('');
    setErrorMessage(null);
    dispatch(setSearchQuery('')); 
  };

  return (
    <Box>
      <Container maxWidth='sm'>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent='center'
          alignItems='center'
        >
          <TextField
            fullWidth
            variant='outlined'
            value={addQuery}
            onChange={searchOnChange}
            placeholder='Search'
            type='text'
            size='small'
          />
          <Button
            variant='contained'
            onClick={handleSearchTodo}
            sx={{
              minWidth: { xs: '100%', sm: 120 },
            }}
          >
            Search
          </Button>

          <Button
            variant='outlined'
            onClick={handleClear}
            sx={{ minWidth: { xs: '100%', sm: 120 } }}
          >
            Clear
          </Button>
        </Stack>
      </Container>

      {errorMessage && (
        <Alert severity='error' sx={{ marginTop: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};
