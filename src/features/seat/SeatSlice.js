import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    departure: {
        flight: {},
        seats: [],
        total: 0,
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
        },
        setTotal: (state, action) => {
            state.departure.total = action.payload;
        }
    },
    extraReducers: (builder) => {
    },
});

export const {setDepartureSeats, setTotal} = seatSlice.actions;

export const selectDepartureSeats = (state) => state.seat.departure;
export const selectDepartureTotal = (state) => state.seat.total;
export const selectReturnSeats = (state) => state.seat.return;
const seatReducer = seatSlice.reducer
export default seatReducer;
