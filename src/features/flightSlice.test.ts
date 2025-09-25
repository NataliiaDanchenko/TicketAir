import { flightReducer, addItem, removeItem, clearItem } from "./flightSlice";
import type { IFlight } from "@/entities/types/flight";

describe("flightSlice reducers", () => {
  it("addItem додає рейс до кошику", () => {
    const initialState = flightReducer(undefined, { type: "" });

    const flight: IFlight = { id: "f1", airline: "TestAir", price: 200 } as IFlight;
    const seatsId = ["1A", "1B"];

    const state = flightReducer(initialState, addItem({ flight, seatsId }));

    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].id).toBe("f1");
    expect(state.cartItems[0].seatsId).toEqual(["1A", "1B"]);
  });

  it("removeItem видаляє рейс із кошику", () => {
    const flight: IFlight = { id: "f1", airline: "TestAir", price: 200 } as IFlight;
    const seatsId = ["1A", "1B"];

    const stateWithItem = flightReducer(undefined, addItem({ flight, seatsId }));

    const stateAfterRemove = flightReducer(stateWithItem, removeItem({ flightId: "f1", seatsId }));

    expect(stateAfterRemove.cartItems).toHaveLength(0);
  });

  it("clearItem очищає кошик", () => {
    const flight: IFlight = { id: "f1", airline: "TestAir", price: 200 } as IFlight;
    const seatsId = ["1A", "1B"];

    const stateWithItem = flightReducer(undefined, addItem({ flight, seatsId }));

    const clearedState = flightReducer(stateWithItem, clearItem());

    expect(clearedState.cartItems).toHaveLength(0);
  });
});
