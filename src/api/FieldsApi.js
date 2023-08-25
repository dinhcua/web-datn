import HttpClient from './HttpClient';

const FieldsApi = {
    getAll(params) {
        console.log(params);
        return HttpClient.get(`fields/get`, { params });
    },

    getById(id) {
        return HttpClient.get(`fields/get/${id}`);
    },
};

export default FieldsApi;
