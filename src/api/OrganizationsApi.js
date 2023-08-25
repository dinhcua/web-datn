import HttpClient from './HttpClient';

const OrganizationsApi = {
    getAll(params) {
        return HttpClient.get(`organizations/get`, { params });
    },

    getGroupFields() {
        return HttpClient.get(`organizations/get-group-fields`);
    },

    getById(id) {
        return HttpClient.get(`organizations/get/${id}`);
    },
};

export default OrganizationsApi;
