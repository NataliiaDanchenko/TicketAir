import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Grid, Box } from '@mui/material';

import type { RootState } from '@/app/store/createReduxStore';
import { useGetFlightsQuery } from '@/entities/model/services/flightApi';
import { setPagination, setSort, setSearchQuery, initialState } from '@/features/flightSlice';

import type { IFlight } from '@/entities/types/flight';
import type { SortField } from '@/features/flightSlice';

import { FlightCard } from '@/entities/ui/FlightCard';
import { FlightSort } from '@/entities/ui/FlightSort';
import { FlightPagination } from '@/entities/ui/FlightPagination';
import { FlightFilter } from '@/entities/ui/FlightFilter';

export const FlightList = () => {
  const dispatch = useDispatch();
  const { sortBy, sortOrder, pagination, searchQuery } = useSelector(
    (state: RootState) => state.flight,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => { // ініціалізуємо параметри сторінки з url
    const page = Number(searchParams.get('page') || pagination.page);
    const sortParam = searchParams.get('sortBy') || sortBy;
    const orderParam = (searchParams.get('sortOrder') as 'asc' | 'desc');
    const airline = searchParams.get('airline') || searchQuery;

    const validSortBy: SortField = ['price', 'airline'].includes(sortParam)
      ? (sortParam as SortField)
      : sortBy;

    dispatch(setPagination({ page, limit: pagination.limit })); // оновлюємо redux
    dispatch(setSort({ sortBy: validSortBy, sortOrder: orderParam }));
    dispatch(setSearchQuery(airline));
  }, [
    searchParams,
    pagination.limit,
    dispatch,
  ]);

  useEffect(() => { // синхронизація з url оновленого redux
    const params: Record<string, string> = {};
    if (searchQuery) params.airline = searchQuery;
    params.sortBy = sortBy;
    params.sortOrder = sortOrder || 'asc';
    params.page = String(pagination.page);

    setSearchParams(params);
  }, [searchQuery, sortBy, sortOrder, pagination.page, setSearchParams]);


  // Створюємо параметри запиту для RTK Query
  const queryParams = useMemo(
    () => ({
      airline: searchQuery,
      sortBy,
      sortOrder: sortOrder || 'asc',
      pagination,
    }),
    [searchQuery, sortBy, sortOrder, pagination],
  );

  const { data, isLoading, isError } = useGetFlightsQuery(queryParams);

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
        <Typography color='error'>Помилка завантаження рейсів</Typography>
      </Container>
    );
  }

  const flights = data ?? [];

  const handlePrev = () => {
    if (pagination.page > 1) {
      dispatch(setPagination({ page: pagination.page - 1 }));
    }
  };

  const handleNext = () => {
    if (flights.length > 0) {
      dispatch(setPagination({ page: pagination.page + 1 }));
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <FlightFilter />
      </Box>

      <Grid container spacing={2}>
        {flights?.map((flight: IFlight) => (
          <Grid item xs={12} sm={6} md={4} key={flight.id}>
            <FlightCard flight={flight} />
          </Grid>
        ))}
      </Grid>
      <FlightSort />
      <FlightPagination
        sizePage={initialState.pagination.limit}
        currentPage={pagination.page}
        currentPageItemsCount={flights.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onPageChange={(page: number) => dispatch(setPagination({ page }))}
      />
    </Container>
  );
};
