import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IFlight } from '@/entities/types/flight';

const savedCart = localStorage.getItem('flight');

export type ICartItem = Pick<
  IFlight,
  'id' | 'airline' | 'from' | 'to' | 'departureTime' | 'arrivalTime' | 'price' | 'terminal' | 'gate'
> & { seatsId: string[] };

interface FlightState {
  cartItems: ICartItem[];
}

export const initialState: FlightState = {
  cartItems: savedCart ? JSON.parse(savedCart) : [],
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ flight: IFlight; seatsId: string[] }>) => {
      const { flight, seatsId } = action.payload;

      const exist = state.cartItems.find(item => item.id === flight.id);

      let updatedSeats: string[] = [];

      if (exist) {
        exist.seatsId = exist.seatsId || [];
        const newSeats = seatsId.filter(id => !exist.seatsId.includes(id));
        exist.seatsId = [...exist.seatsId, ...newSeats];
        updatedSeats = exist.seatsId;
      } else {
        state.cartItems.push({ ...flight, seatsId });
        updatedSeats = seatsId;
      }

      localStorage.setItem('flight', JSON.stringify(state.cartItems));
      localStorage.setItem(`selectedSeats_${flight.id}`, JSON.stringify(updatedSeats));
    },

    removeItem: (state, action: PayloadAction<{ seatsId: string[], flightId: string }>) => {
      const { flightId, seatsId } = action.payload;
      state.cartItems = state.cartItems.filter(
        item =>
          item.id !== flightId ||
          JSON.stringify(item.seatsId) !== JSON.stringify(seatsId)
      );
      localStorage.setItem('flight', JSON.stringify(state.cartItems));
      localStorage.removeItem(`selectedSeats_${flightId}`);
    },

    clearItem: (state) => {
      state.cartItems = [];
      localStorage.setItem('flight', JSON.stringify([]));
      Object.keys(localStorage)
        .filter(key => key.startsWith('selectedSeats_'))
        .forEach(key => localStorage.removeItem(key));
    },
  },
});

export const { addItem, removeItem, clearItem } = flightSlice.actions;
export const flightReducer = flightSlice.reducer;






