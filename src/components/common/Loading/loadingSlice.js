import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        loading(state, action) {
            return action.payload;
        },
    },
});

const { actions, reducer } = loadingSlice;
export const { loading } = actions; // named export
export default reducer; // default export
