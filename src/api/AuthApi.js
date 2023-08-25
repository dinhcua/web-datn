import HttpClient from './HttpClient';

const AuthApi = {
    register(data) {
        return HttpClient.post(`auth/register`, data);
    },

    login(data) {
        return HttpClient.post(`auth/login`, data);
    },

    user() {
        return HttpClient.get(`auth/user`);
    },

    refresh() {
        return HttpClient.post(`auth/refresh`);
    },

    logout() {
        return HttpClient.post(`auth/logout`);
    },
};

export default AuthApi;
