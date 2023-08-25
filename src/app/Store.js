import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'components/Auth/userSlice';
import loadingReducer from 'components/common/Loading/loadingSlice';
import fileReducer from 'components/File/fileSlice';

const rootReducer = {
    user: userReducer,
    loading: loadingReducer,
    file: fileReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
