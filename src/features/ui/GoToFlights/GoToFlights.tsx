import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';

export const GoToFlights = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); 
  };

  console.log('GoToFlights rendered');
  return (
    <Button variant='outlined' color='primary' onClick={handleClick}>
      Go to Flights
    </Button>
  );
};
