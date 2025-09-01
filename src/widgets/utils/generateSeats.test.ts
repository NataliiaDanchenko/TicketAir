import { generateSeats } from "./generateSeats";
import type { Seat } from "@/widgets/types/seat";

describe("generateSeats", () => {
  it("генерація місць", () => {
    const totalSeats = 12; 
    const seats = generateSeats(totalSeats, 0);

    // Перевіряємо кількість місць
    expect(seats).toHaveLength(totalSeats);

    // Перевіряємо перший ряд
    expect(seats[0]).toEqual<Seat>({  
      id: "1A",
      row: 1,
      col: "A",
      occupied: false,
    });

    // Перевіряємо останній ряд
    expect(seats[11]).toEqual<Seat>({ 
      id: "2F",
      row: 2,
      col: "F",
      occupied: false,
    });
  });

  it("обрані місця позначені як зайняті", () => {
    const totalSeats = 6;
    const selected = ["1C", "1E"];
    const seats = generateSeats(totalSeats, 0, selected); // місця мають бути обрані користувачем, selected 

    selected.forEach((id) => {
      const seat = seats.find((s) => s.id === id);
      expect(seat?.occupied).toBe(true); // обрані місця стають зайнятими, occupied
    });
  });
});
