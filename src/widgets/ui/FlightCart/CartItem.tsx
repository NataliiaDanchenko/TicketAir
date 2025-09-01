import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { removeItem, type ICartItem } from '@/features/flightSlice';
import { Button } from '@/shared/ui/Button';

interface CartItemProps {
  flight: ICartItem;
  seatsId: string[];
}

export const CartItem = memo(({ flight, seatsId }: CartItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToFlights = () => {
    navigate('/');
  };

  const { id, airline, from, to, price } = flight;

  return (
    <Paper key={id} elevation={2} sx={{ p: 2 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent='space-between'
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='subtitle1'>
            <strong>{airline}</strong>: {from} → {to}
          </Typography>
          <Typography variant='body2'>
            Ціна: {price}$ × {seatsId.length} = {price * seatsId.length}$
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Місця {seatsId && seatsId.length > 0 ? seatsId.join(', ') : 'немає'}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: '100%', sm: 'auto' },
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-end' },
          }}
        >
          <Button
            onClick={() => {
              dispatch(removeItem({ flightId: id, seatsId }));
              setTimeout(() => {
                const cartItems = JSON.parse(
                  localStorage.getItem('flight') || '[]',
                );
                if (cartItems.length === 0) {
                  goToFlights();
                }
              }, 400); 
            }}
            buttonType='delete'
          >
            Видалити
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
});
