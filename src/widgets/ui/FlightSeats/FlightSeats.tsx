import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
  Box,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetFlightByIdQuery } from '@/entities/model/services/flightApi';
import { addItem } from '@/features/flightSlice';
import { generateSeats } from '@/widgets/utils/generateSeats';

import { Button } from '@/shared/ui/Button';
import { SeatButton } from './SeatButton';

export const FlightSeats = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetFlightByIdQuery(id!);

  const [selectedSeats, setSelectedSeats] = useState<string[]>(() => {
    const saved = id ? localStorage.getItem(`selectedSeats_${id}`) : null;
    return saved ? JSON.parse(saved) : [];
  });

  // Зберігаємо обрані місця в localStorage при кожній зміні
  useEffect(() => {
    if (id && selectedSeats.length > 0) {
      localStorage.setItem(
        `selectedSeats_${id}`,
        JSON.stringify(selectedSeats),
      );
    } else if (id) {
      localStorage.removeItem(`selectedSeats_${id}`);
    }
  }, [selectedSeats, id]);

  // Генеруємо схему місць
  const baseSeats = useMemo(() => {
    if (!data) return [];
    const totalSeats = data.tickets.total;
    const occupiedSeats = totalSeats - data.tickets.remaining;
    return generateSeats(totalSeats, occupiedSeats, []);
  }, [data]);

  // Додаємо обрані місця
  const seats = useMemo(() => {
    return baseSeats.map((seat) => ({
      ...seat,
      isSelected: selectedSeats.includes(seat.id),
    }));
  }, [baseSeats, selectedSeats]);

  // Використовуємто Set + useMemo() для швидкого пошуку
  const selectedSeatsSet = useMemo(
    () => new Set(selectedSeats),
    [selectedSeats],
  );

  // Очищуємо обрані місця при очищенні localStorage
  useEffect(() => {
    const handleClearSeats = (event: StorageEvent) => {
      if (event.key === `selectedSeats_${id}` && event.newValue === null) {
        setSelectedSeats([]);
      }
    };

    window.addEventListener('storage', handleClearSeats);
    return () => window.removeEventListener('storage', handleClearSeats);
  }, [id]);

  const toggleSeat = useCallback((seatId: string) => {
    // useCallback() щоб всі кнопки не перестворювалися при кожному рендері
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId],
    );
  }, []);

  const goToCart = useCallback(() => {
    if (data) {
      dispatch(addItem({ flight: data, seatsId: selectedSeats }));
      navigate('/cart');
    }
  }, [data, selectedSeats, dispatch, navigate]);

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
    <Box
      sx={{
        maxWidth: {
          xs: 300,
          sm: 400,
          md: 600,
          lg: 700,
        },
        width: '100%',
        mx: 'auto',
      }}
    >
      <Typography variant='h6' gutterBottom>
        Оберіть місце
      </Typography>

      <Grid
        container
        spacing={1}
        sx={{
          maxWidth: {
            xs: 300,
            sm: 400,
            md: 600,
            lg: 700,
          },
          width: '100%',
          mx: 'auto',
          flexWrap: 'wrap',
        }}
      >
        {seats.map((seat) => (
          <SeatButton
            key={seat.id}
            seat={seat}
            isSelected={selectedSeatsSet.has(seat.id)}
            toggleSeat={toggleSeat}
          />
        ))}
      </Grid>

      {selectedSeats.length > 0 && (
        <Typography sx={{ mt: 2 }}>
          Обрані місця: {selectedSeats.join(', ')}
        </Typography>
      )}

      <Button onClick={goToCart} variant='outlined' sx={{ mt: 2 }}>
        Додати до корзини
      </Button>
    </Box>
  );
};
