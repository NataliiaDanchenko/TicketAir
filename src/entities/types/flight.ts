// Тип для місць
export interface ITickets {
  total: number;
  remaining: number;
}

// Тип для одного рейсу
export interface IFlight {
  id: string;
  airline: string;
  from: string;          // аеропорт відправлення
  to: string;            // аеропорт прибуття
  departureTime: string; // ISO дата-час відправлення
  arrivalTime: string;   // ISO дата-час прибуття
  price: number;         
  terminal: string;
  gate: string;
  tickets: ITickets;     // об'єкт з інформацією про місця
}





