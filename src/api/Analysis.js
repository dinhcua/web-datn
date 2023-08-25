import HttpClient from './HttpClient';

const Analysis = {
    general() {
        return HttpClient.get(`analysis/general`);
    },

    byMonth() {
        return HttpClient.get(`analysis/by-month`);
    },

    fileFinished() {
        return HttpClient.get(`analysis/file-finished`);
    },
};

export default Analysis;
