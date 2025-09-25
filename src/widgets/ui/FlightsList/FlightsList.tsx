import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, CircularProgress, Grid, Box } from '@mui/material';

import { useGetFlightsQuery } from '@/entities/model/services/flightApi';
import type { IFlight } from '@/entities/types/flight';

import { FlightCard } from '@/entities/ui/FlightCard';
import { FlightSort } from '@/entities/ui/FlightSort';
import { FlightPagination } from '@/entities/ui/FlightPagination';
import { FlightFilter } from '@/entities/ui/FlightFilter';
import { GoToFlights } from '@/features/ui/GoToFlights/GoToFlights';
import { ErrorMess } from '@/shared/ui/ErrorMess';

export type SortField = 'price' | 'airline';
const totalItemsFallback = 35;

export const FlightList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 6);
  const sortBy = (searchParams.get('sortBy') || 'price') as SortField;
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc';
  const searchQuery = searchParams.get('query') || '';

  const queryParams = useMemo(
    () => ({
      airline: '',
      sortBy,
      sortOrder,
    }),
    [sortBy, sortOrder, page, limit],
  );

  const { data, isLoading, isError } = useGetFlightsQuery(queryParams);
  const flights = data ?? [];

  const filteredFlights = searchQuery
    ? flights.filter(
        (f) =>
          f.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.to.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : flights;

  const startIndex = (page - 1) * limit;
  const paginatedFlights = filteredFlights.slice(
    startIndex,
    startIndex + limit,
  );

  const totalPages = searchQuery
    ? Math.ceil(filteredFlights.length / limit)
    : Math.ceil(totalItemsFallback / limit);

  const setPage = (newPage: number) => {
    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  const setSort = (newSortBy: SortField, newSortOrder: 'asc' | 'desc') => {
    searchParams.set('sortBy', newSortBy);
    searchParams.set('sortOrder', newSortOrder);
    setSearchParams(searchParams);
  };

  const setSearch = (query: string) => {
    const params = new URLSearchParams();
    if (query) {
      params.set('query', query);
    }
    params.set('page', '1'); 
    setSearchParams(params);
  };

  if (isLoading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ py: 4 }}>
        <ErrorMess
          message='Помилка завантаження рейсів'
          action={<GoToFlights />}
        />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <FlightFilter initialValue={searchQuery} onSearch={setSearch} />
      </Box>

      <Grid container spacing={2}>
        {paginatedFlights.map((flight: IFlight) => (
          <Grid item xs={12} sm={6} md={4} key={flight.id}>
            <FlightCard flight={flight} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ my: 2 }}>
        <FlightSort
          currentSortBy={sortBy}
          currentSortOrder={sortOrder}
          onSortChange={setSort}
        />
      </Box>

      <FlightPagination
        sizePage={limit}
        currentPage={page}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </Container>
  );
};

