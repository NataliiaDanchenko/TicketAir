import { Box, Container, Typography } from "@mui/material";
import { FlightCart } from '@/widgets/ui/FlightCart';

export const Cart = () => {
  return (
    <Container maxWidth='lg'>
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Кошик
        </Typography>
        <FlightCart /> 
      </Box>
    </Container>
  );
};
