import Swal from 'sweetalert2';
import './SweetAlert.scss';

const SweetAlert = {
    success(message) {
        Swal.fire({
            icon: 'success',
            title: 'Thành công',
            html: message,
        });
    },

    successCallback(message, callback) {
        Swal.fire({
            title: 'Thành công',
            html: message,
            icon: 'success',
            confirmButtonText: 'Đồng ý',
        }).then((result) => {
            if (result.isConfirmed) {
                callback();
            }
        });
    },

    warningCallback(message, callback) {
        Swal.fire({
            title: 'Cảnh báo',
            html: message,
            icon: 'warning',
            confirmButtonText: 'Đồng ý',
        }).then((result) => {
            if (result.isConfirmed) {
                callback();
            }
        });
    },

    error(message) {
        Swal.fire({
            icon: 'error',
            title: 'Thất bại!',
            html: message,
        });
    },

    confirm(message, callback, icon = 'warning', title = 'Cảnh báo!') {
        Swal.fire({
            icon: icon,
            title: title,
            html: message,
            showCancelButton: true,
            backdrop: 'rgba(0,0,0,0.4)',
            confirmButtonText: 'Đồng ý',
            confirmButtonColor: '#AD4105',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                callback();
            }
        });
    },
};

export default SweetAlert;
