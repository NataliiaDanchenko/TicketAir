import { configureStore } from "@reduxjs/toolkit";
import { flightApi } from "@/entities/model/services/flightApi";
import { flightReducer } from "@/features/flightSlice";

export const createReduxStore = () => {
  return configureStore({
    reducer: {
      flight: flightReducer,
      [flightApi.reducerPath]: flightApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(flightApi.middleware), 
  })
}

export const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;