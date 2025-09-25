import { Box } from '@mui/material';
import { ThemeToggle } from '@/features/theme/ui/ThemeToggle';
import { FlightList } from '@/widgets/ui/FlightsList';

export const FlightsPage = () => {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', p: 2 }}>
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <ThemeToggle />
      </Box>
      <FlightList />
    </Box>
  );
};
