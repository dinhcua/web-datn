const FullnameValidate = {
    name: 'name is short',
    message: 'Họ tên bạn nhập quá ngắn (ít nhất 2 từ)',
    test: (value) => value.split(' ').length >= 2,
};

export default FullnameValidate;