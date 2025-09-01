# TicketAir

**TicketAir** is an airline ticket booking application.

It allows users to:
- Browse a list of available flights.
- Filter flights by airline, departure, and arrival locations.
- Sort flights by price or airline.
- Add flights to the cart and manage selected seats.
- Persist cart state in `localStorage`.

---

## **Technologies**

- React + TypeScript
- Redux Toolkit (RTK + RTK Query)
- Material UI (MUI) for UI components
- React Router for navigation
- Vite for bundling

---

## **Architecture (FSD)**

The project follows **Feature-Sliced Design (FSD)** principles

---

## **Usage**
Filtering and Search

Type a query in the search field and click Search

Click Clear to reset the filter

Adding a Flight to Cart

Click Delete to remove a flight from the cart

Cart data is saved in localStorage

Sorting

Flights can be sorted by price or airline using Redux state (sortBy and sortOrder)

---

## **Future Improvements**

Add filters by departure and return date

Implement pagination for large flight lists

Add animations when adding/removing flights from the cart

---

## **Author**

Nataliia Danchenko

