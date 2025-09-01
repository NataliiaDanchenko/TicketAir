import type { Seat } from "@/widgets/types/seat";

export const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

// Генерація схеми обраних і зайнятих місць
export function generateSeats(
  totalSeats: number,
  occupiedSeatsCount: number,
  selectedSeats: string[] = [],
): Seat[] {
  const seats: Seat[] = [];
  const ROWS = Math.ceil(totalSeats / letters.length);
  const COLS = letters.length;

  // Створюємо місця
  let seatIndex = 0;
  for (let r = 1; r <= ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (seatIndex >= totalSeats) break;
      const id = `${r}${letters[c]}`;
      seats.push({ id, row: r, col: letters[c], occupied: false });
      seatIndex++;
    }
  }

  // Створюємо випадково зайняті місця
  const availableIndices = seats.map((_, index) => index);
  for (let i = 0; i < occupiedSeatsCount; i++) {
    if (availableIndices.length === 0) break;
    const randIndex = Math.floor(Math.random() * availableIndices.length);
    const seatIndexToOccupy = availableIndices.splice(randIndex, 1)[0];
    seats[seatIndexToOccupy].occupied = true;
  }

  selectedSeats.forEach((id) => {
    const seat = seats.find((s) => s.id === id);
    if (seat) seat.occupied = true;
  });

  return seats;
}
