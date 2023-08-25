import HttpClient from './HttpClient';

const Address = {
    getProvince() {
        return HttpClient.get(`address/province`);
    },

    getDistrict(id) {
        return HttpClient.get(`address/district/${id}`);
    },

    getWard(id) {
        return HttpClient.get(`address/ward/${id}`);
    },

    getAddress(id) {
        return HttpClient.get(`address/address/${id}`);
    },
};

export default Address;
