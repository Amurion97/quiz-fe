import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {customAPIv1} from "../customAPI";

const initialState = {
    state: "idle",
    info: {},
    token: {}
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const login = createAsyncThunk(
    'user/login',
    async (arg, {rejectWithValue}) => {
        console.log("arg:", arg)
        let response = await customAPIv1().post('users/login', {
            email: arg.email,
            password: arg.password
        })
        return response.data.data;

        return true

        try {
            const response = await customAPIv1().post('users/login', {
                email: arg.email,
                password: arg.password
            })
            return response.data.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        logout: (state) => {
            localStorage.removeItem("user");
            state.info = {};
            state.token = {};
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("login success:", action.payload)
                state.status = 'idle';
                state.info = action.payload.info;
                state.token = action.payload.token;
                localStorage.setItem("user", JSON.stringify(action.payload))
            })
            .addCase(login.rejected, (state) => {
                console.log("error in login")
                state.status = 'idle';
            });
    },
});

export const {logout} = userSlice.actions;
export const selectUser = (state) => state.user;

const userReducer = userSlice.reducer
export default userReducer;
