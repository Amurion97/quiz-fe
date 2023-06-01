import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {customAPIv1} from "../customAPI";

const initialState = {
    departure: {
        status: "idle",
        length: 0,
        list: [],
    },
    return: {
        status: "idle",
        length: 0,
        list: [],
    }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchFlights = createAsyncThunk(
    'flight/fetchFlight',
    async (arg, thunkAPI) => {
        console.log("arg:", arg)
        const response = await customAPIv1().get('flights', {
            params: {
                // from: arg.query.get("from"),
                // to: arg.query.get("to"),
                // start: arg.query.get("start"),
                // class: arg.query.get("class"),
                // skip: (arg.skip) ? arg.skip : "",
                from: arg.query.from.id,
                to: arg.query.to.id,
                start: arg.query.start ? arg.query.start.split(",")[0] : "",
                class: arg.query.class,
                skip: (arg.skip) ? arg.skip : "",
            }
        })
        console.log("response data:", response.data)
        // The value we return becomes the `fulfilled` action payload
        return response.data.data;
    }
);

export const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlights.pending, (state) => {
                state.departure.status = 'loading';
            })
            .addCase(fetchFlights.fulfilled, (state, action) => {
                console.log("fetch flights success:", action.payload)
                state.departure.status = 'idle';
                console.log(state.departure.list instanceof Array, action.payload instanceof Array)
                // state.departure.list = [...state.departure.list,...action.payload];
                state.departure.list = [...action.payload];
                state.departure.length += action.payload.length;
            })
            .addCase(fetchFlights.rejected, (state) => {
                console.log("error in fetch flights")
                state.departure.status = 'idle';
            });
    },
});

export const {increment, decrement, incrementByAmount} = flightSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDeparture = (state) => state.flight.departure;
export const selectReturn = (state) => state.flight.return;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
    const currentValue = selectDeparture(getState());
    if (currentValue % 2 === 1) {
        dispatch(incrementByAmount(amount));
    }
};
const flightReducer = flightSlice.reducer
export default flightReducer;
