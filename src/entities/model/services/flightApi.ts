import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IFlight } from '@/entities/types/flight';
import type { FlightsResponse } from '@/entities/types/flights';
import type { GetFlightsRequest } from '@/entities/model/types/getFlightsRequest';

import { BASE_URL } from '@/shared/api/baseUrl';

export const flightApi = createApi({
  reducerPath: 'flightApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Flight'],
  endpoints: (builder) => ({
    getFlights: builder.query<FlightsResponse, GetFlightsRequest>({
      query: ({ airline, sortBy, sortOrder, pagination }) => {
        const searchParams = new URLSearchParams();

        if (airline) {
          searchParams.append('airline', airline);
        }

        if (sortBy) {
          searchParams.append('sortBy', sortBy);
        }
        if (sortOrder) {
          searchParams.append('order', sortOrder);
        }

        if (pagination) {
          const { page, limit } = pagination;
          if (page) searchParams.append('page', String(page));
          if (limit) searchParams.append('limit', String(limit));
        }

        // якщо параметри порожні, повернути /flights
        const queryString = searchParams.toString();
        return { url: queryString ? `/flights?${queryString}` : '/flights' };
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Flight' as const, id })),
            { type: 'Flight', id: 'LIST' },
          ]
          : [{ type: 'Flight', id: 'LIST' }],
    }),

    getFlightById: builder.query<IFlight, string>({
      query: (id) => ({ url: `/flights/${id}` }),
      providesTags: (result, _error, id) =>
        result ? [{ type: 'Flight', id: result.id }] : [{ type: 'Flight', id }],
    }),
  }),
});

export const { useGetFlightsQuery, useGetFlightByIdQuery } = flightApi;
