import axios from "axios";

export const BASE_URL = 'https://679d13f487618946e6544ccc.mockapi.io/testove/v1';

export const jsonFlights = axios.create({
  baseURL: BASE_URL,
})