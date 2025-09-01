import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { Button } from '@/shared/ui/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToFlights = () => {
    navigate('/flights'); 
  };

  return (
    <Container maxWidth='sm'>
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Not Found
        </Typography>
        <Button
          buttonType='viewDetails'
          onClick={goToFlights}
          variant='contained'
          sx={{ mt: 3 }}
        >
          Повернутися до списку рейсів
        </Button>
      </Box>
    </Container>
  );
};
