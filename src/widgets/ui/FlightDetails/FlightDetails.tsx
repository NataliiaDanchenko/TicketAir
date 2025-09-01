import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Paper, Divider, Stack } from '@mui/material';

import { useGetFlightByIdQuery } from '@/entities/model/services/flightApi';

import { Button } from '@/shared/ui/Button';
import { AppModal } from '@/shared/ui/AppModal';
import { FlightSeats } from '@/widgets/ui/FlightSeats';

export const FlightDetails = () => {
  const [open, setOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetFlightByIdQuery(id!);

  const departureFormatted = useMemo(
    () => (data ? new Date(data.departureTime).toLocaleString() : ''),
    [data?.departureTime],
  );

  const arrivalFormatted = useMemo(
    () => (data ? new Date(data.arrivalTime).toLocaleString() : ''),
    [data?.arrivalTime],
  );

  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  if (!id) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color='error'>Неправильний ID рейсу</Typography>
      </Container>
    );
  }

  const goToFlights = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color='error'>
          Помилка завантаження деталей рейсу
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        py: 4,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: {
            xs: 300,
            sm: 400,
            md: 500,
            lg: 600,
          },
          bgcolor: 'background.default',
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={{ fontWeight: 600, textAlign: 'center' }}
        >
          {data.airline} Деталі рейсу
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          <Typography variant='body1'>
            <strong>From:</strong> {data.from}
          </Typography>
          <Typography variant='body1'>
            <strong>To:</strong> {data.to}
          </Typography>
          <Typography variant='body1'>
            <strong>Departure:</strong>{' '}
            {departureFormatted}
          </Typography>
          <Typography variant='body1'>
            <strong>Arrival:</strong>{' '}
            {arrivalFormatted}
          </Typography>
          <Typography variant='h6' color='primary' sx={{ fontWeight: 600 }}>
            Price: ${data.price}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent='center'
        >
          <Button buttonType='viewDetails' onClick={modalOpen}>
            Обрати місце
          </Button>
          <Button buttonType='viewDetails' onClick={goToFlights}>
            Повернутися
          </Button>
        </Stack>
      </Paper>

      <AppModal open={open} onClose={modalClose}>
        <Box>
          <FlightSeats />
        </Box>
      </AppModal>
    </Container>
  );
};
