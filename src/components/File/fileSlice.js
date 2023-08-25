import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
    name: 'file',
    initialState: {
        step: 0,
        procedure: null,
        option: null,
        user: null,
    },
    reducers: {
        clearFile(state) {
            return { step: 4, procedure: null, option: null, user: null };
        },
        setStep(state, action) {
            state.step = action.payload;
        },
        setProcedure(state, action) {
            state.procedure = action.payload;
        },
        setOption(state, action) {
            state.option = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

const { actions, reducer } = fileSlice;
export const { clearFile, setStep, setProcedure, setOption, setUser } = actions; // named export
export default reducer;
