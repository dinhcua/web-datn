import AuthApi from 'api/AuthApi';
import store from 'app/Store';
import axios from 'axios';
import { logout } from 'components/Auth/userSlice';
import { loading } from 'components/common/Loading/loadingSlice';
import Storages from 'constants/storage';
import SweetAlert from 'lib/SweetAlert';
import queryString from 'query-string';

const HttpClient = axios.create({
    baseURL: process.env.REACT_APP_ROOT_API,
    headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

const refreshToken = async () => {
    const {
        data: { token },
    } = await AuthApi.refresh();

    // save data to local storage
    localStorage.setItem(Storages.TOKEN, token.access_token);

    return token.access_token;
};

// Interceptors
// Add a request interceptor
HttpClient.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem(Storages.TOKEN);
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
HttpClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    async function (error) {
        const { config, status, data } = error.response;

        const accessToken = localStorage.getItem(Storages.TOKEN);

        if (accessToken && status === 401 && config.url.search('/logout') === -1) {
            try {
                let newAccessToken = await refreshToken();
                config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return HttpClient(config);
            } catch (error) {}

            SweetAlert.warningCallback('Phiên đăng nhập đã hết hạn.', async () => {
                store.dispatch(loading(true));
                try {
                    await store.dispatch(logout());
                } catch (error) {}
                store.dispatch(loading(false));
            });
        }

        let message = '';
        if (status === 422) {
            message = Object.keys(data.errors)
                .map((key) => data.errors[key].join('<br>'))
                .join('<br>');
        } else {
            message = data.message;
        }

        return Promise.reject({ name: `${status}`, message });
    }
);

export default HttpClient;
