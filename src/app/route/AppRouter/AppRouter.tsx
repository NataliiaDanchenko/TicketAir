import { Route, Routes } from 'react-router-dom';
import { FlightsPage } from '@/pages/FlightsPage/FlightsPage';
import { FlightDetailsPage } from '@/pages/FlightDetailsPage/FlightDetailsPage';
import { Cart } from '@/pages/Cart/Cart';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';

export const AppRouter = ({}) => {
  return (
    <Routes>
      <Route path='/' element={<FlightsPage />} />
      <Route path='flights/:id' element={<FlightDetailsPage />} />
      <Route path='cart' element={<Cart />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
