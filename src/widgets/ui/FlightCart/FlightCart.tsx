import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';

import type { RootState } from '@/app/providers/store/createReduxStore';
import { clearItem } from '@/features/flightSlice';

import { Button } from '@/shared/ui/Button';
import { CartItem } from './CartItem';
import { useMemo } from 'react';

export const FlightCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.flight.cartItems);

  // Загальна сума рахується по кількості місць
  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * (item.seatsId?.length || 0),
      0,
    );
  }, [cartItems]);

  if (cartItems.length === 0) {
    return <p>Кошик порожній</p>;
  }

  const goToFlights = () => {
    navigate('/');
  };

  return (
    <Box maxWidth='lg' sx={{ mx: 'auto', width: '100%' }}>
      <Stack spacing={2}>
        {cartItems.map((item) => (
          <CartItem key={item.id} flight={item} seatsId={item.seatsId} />
        ))}
      </Stack>

      <Typography variant='h6' sx={{ mt: 3 }}>
        Загальна сума: {total}$
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
        <Button
          children='Купити'
          onClick={() => alert('Квитки куплено')}
          buttonType='pay'
        />
        <Button
          buttonType='delete'
          onClick={() => dispatch(clearItem())}
          onMouseDown={() => setTimeout(() => goToFlights(), 400)}
          children='Видалити все'
        />
        <Button
          buttonType='viewDetails'
          onClick={goToFlights}
          children='Повернутися до списку рейсів'
        />
      </Stack>
    </Box>
  );
};
