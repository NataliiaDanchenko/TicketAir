import { memo } from 'react';
import { Grid } from '@mui/material';
import type { Seat } from '@/widgets/types/seat';
import { Button } from '@/shared/ui/Button';

interface SeatButtonProps {
  seat: Seat;
  isSelected: boolean;
  toggleSeat: (id: string) => void;
}

export const SeatButton = memo(
  ({ seat, isSelected, toggleSeat }: SeatButtonProps) => (
    <Grid item xs={3} sm={2}>
      <Button
        variant='contained'
        color={
          isSelected
            ? 'success' // обране користувачем
            : seat.occupied
            ? 'error' // зайняте
            : 'primary' // вільне
        }
        disabled={seat.occupied && !isSelected}
        fullWidth
        onClick={() => toggleSeat(seat.id)}
      >
        {seat.id}
      </Button>
    </Grid>
  ),
);
