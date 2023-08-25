import toastr from 'toastr';
import 'toastr/toastr.scss';
import './Toastr.scss';

const Toastr = {
    success(message) {
        toastr.success(message, 'Thành công', { "timeOut": 2000 });
    },

    error(message) {
        toastr.error(message, 'Thất bại', { "timeOut": 2000 });
    },
};

export default Toastr;
