import HttpClient from './HttpClient';

const ProceduresApi = {
    getAll(params) {
        return HttpClient.get(`procedures/get`, { params });
    },

    getById(id) {
        return HttpClient.get(`procedures/get/${id}`);
    },

    getByKey(id) {
        return HttpClient.get(`procedures/get-by-key/${id}`);
    },
};

export default ProceduresApi;
