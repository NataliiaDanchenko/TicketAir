import { flightReducer, addItem, setSort } from "./flightSlice";
import type { IFlight } from "@/entities/types/flight";

describe("flightSlice reducers", () => {
  it("addItem додє рейс до кошику", () => {
    const initialState = flightReducer(undefined, { type: "" });

    const flight: IFlight = { id: "f1", airline: "TestAir", price: 200 } as IFlight;
    const seatsId = ["1A", "1B"];

    const state = flightReducer(initialState, addItem({ flight, seatsId }));

    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].id).toBe("f1");
    expect(state.cartItems[0].seatsId).toEqual(["1A", "1B"]);
  });

  it("setSort сортує рейси", () => {
    const initialState = flightReducer(undefined, { type: "" });

    const state = flightReducer(initialState, setSort({ sortBy: "airline", sortOrder: "asc" }));

    expect(state.sortBy).toBe("airline");
    expect(state.sortOrder).toBe("asc");
  });
});
