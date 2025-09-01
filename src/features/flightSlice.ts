import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IFlight } from '@/entities/types/flight';

export type SortField = 'price' | 'airline';

const savedCart = localStorage.getItem('flight');

export type ICartItem = Pick<
  IFlight,
  'id' | 'airline' | 'from' | 'to' | 'departureTime' | 'arrivalTime' | 'price' | 'terminal' | 'gate'
> & { seatsId: string[] };

interface FlightState {
  items: IFlight[];
  sortBy: SortField,
  sortOrder: 'asc' | 'desc' | null;
  pagination: {
    page: number;
    limit: number;
  };
  searchQuery: string;
  cartItems: ICartItem[],
}

export const initialState: FlightState = {
  items: [],
  sortBy: 'price',
  sortOrder: null,
  pagination: {
    page: 1,
    limit: 6,
  },
  searchQuery: '',
  cartItems: savedCart ? JSON.parse(savedCart) : [],
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ flight: IFlight; seatsId: string[] }>) => {
      const { flight, seatsId } = action.payload;

      let exist = state.cartItems.find(item => item.id === flight.id);

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
          item.id !== action.payload.flightId ||
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

    setSort: (
      state,
      action: PayloadAction<{ sortBy: SortField; sortOrder: 'asc' | 'desc' }>
    ) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },

    setPagination: (
      state,
      action: PayloadAction<Partial<FlightState['pagination']>>
    ) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addItem, removeItem, clearItem, setSort, setPagination, setSearchQuery } =
  flightSlice.actions;
export const flightReducer = flightSlice.reducer;





