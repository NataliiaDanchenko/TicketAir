import { useState, type ChangeEvent, useEffect } from 'react';
import { Box, Container, TextField, Stack } from '@mui/material';
import { Button } from '@/shared/ui/Button';
import { ErrorMess } from '@/shared/ui/ErrorMess/ErrorMess';
import { GoToFlights } from '@/features/ui/GoToFlights/GoToFlights';

interface FlightFilterProps {
  initialValue?: string; 
  onSearch: (query: string) => void; 
}

export const FlightFilter = ({
  initialValue = '',
  onSearch,
}: FlightFilterProps) => {
  const [addQuery, setAddQuery] = useState<string>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setAddQuery(initialValue);
  }, [initialValue]);

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!addQuery.trim()) {
      setErrorMessage('Search query cannot be empty');
      return;
    }
    setErrorMessage(null);
    onSearch(addQuery.trim());
  };

  const handleClear = () => {
    setAddQuery('');
    setErrorMessage(null);
    onSearch(''); 
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
            onClick={handleSearch}
            sx={{ minWidth: { xs: '100%', sm: 120 } }}
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
        <ErrorMess message={errorMessage} action={<GoToFlights />} />
      )}
    </Box>
  );
};

