import HttpClient from './HttpClient';

const FilesApi = {
    getAll(params) {
        return HttpClient.get(`files/get`, { params });
    },

    getFiles(params) {
        return HttpClient.get(`files/get-files`, { params });
    },

    getById(id, access_key) {
        return HttpClient.get(`files/get/${id}`, { params: { access_key } });
    },

    getFileSteps(id) {
        return HttpClient.get(`files/get-file-steps/${id}`);
    },

    fileSubmit(data) {
        return HttpClient.post(`files/submit`, data);
    },

    cancel(id) {
        return HttpClient.post(`files/cancel`, { id });
    },
};

export default FilesApi;
