import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    departure: {
        flight: {},
        seats: []
    },
    return: {
        flight: {},
        seats: []
    }
};

export const seatSlice = createSlice({
    name: 'seat',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setDepartureSeats: (state, action) => {
            console.log("setDepartureSeats:", action.payload);
            state.departure.flight = action.payload.flight;
            state.departure.seats = action.payload.seats;
        }
    },
    extraReducers: (builder) => {
    },
});

export const {setDepartureSeats} = seatSlice.actions;

export const selectDepartureSeats = (state) => state.seat.departure;
export const selectReturnSeats = (state) => state.seat.return;
const seatReducer = seatSlice.reducer
export default seatReducer;
