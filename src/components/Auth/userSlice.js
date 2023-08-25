import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthApi from 'api/AuthApi';
import Storages from 'constants/storage';

export const register = createAsyncThunk('user/register', async (payload) => {
    const {
        data: { token, user },
    } = await AuthApi.register(payload);

    // save data to local storage
    localStorage.setItem(Storages.TOKEN, token.access_token);
    localStorage.setItem(Storages.USER, JSON.stringify(user));

    return user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
    const {
        data: { token, user },
    } = await AuthApi.login(payload);
    // console.log('token', token);
    // console.log('user', user);

    // save data to local storage
    localStorage.setItem(Storages.TOKEN, token.access_token);
    localStorage.setItem(Storages.USER, JSON.stringify(user));

    return user;
});

export const refresh = createAsyncThunk('user/refresh', async () => {
    const {
        data: { token, user },
    } = await AuthApi.refresh();

    // save data to local storage
    localStorage.setItem(Storages.TOKEN, token.access_token);
    localStorage.setItem(Storages.USER, JSON.stringify(user));

    return user;
});

export const logout = createAsyncThunk('user/logout', async () => {
    try {
        await AuthApi.logout();
    } catch (error) {}

    // clear local storage
    localStorage.removeItem(Storages.USER);
    localStorage.removeItem(Storages.TOKEN);

    return {};
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(Storages.USER)) || {},
        settings: {},
    },
    reducers: {},
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
        },

        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },

        [refresh.fulfilled]: (state, action) => {
            state.current = action.payload;
        },

        [logout.fulfilled]: (state, action) => {
            state.current = {};
        },
    },
});

const { reducer } = userSlice;
export default reducer;
