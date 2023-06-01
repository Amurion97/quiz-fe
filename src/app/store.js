import { configureStore } from '@reduxjs/toolkit';
import flightReducer from "../features/flight/flightSlice";
import seatReducer from "../features/seat/SeatSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    flight: flightReducer,
    seat: seatReducer,
    user: userReducer
  },
});
