import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from 'components/common/FormControls/Checkbox';
import InputField from 'components/common/FormControls/InputField';
import PasswordField from 'components/common/FormControls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {
    const schema = yup.object().shape({
        email: yup.string().required('Email không được để trống').email('Email không hợp lệ'),
        password: yup.string().required('Mật khẩu không được bỏ trống'),
    });

    const { email, password, remember } = props.dataAccount;

    const form = useForm({
        defaultValues: {
            email: email || '',
            password: password || '',
            remember: remember || false,
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const { onSubmit } = props;
        if (onSubmit) {
            console.log(data);
            await onSubmit(data);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-center">
            <InputField label="Email đăng nhập" name="email" form={form} required hiddenLabel />
            <PasswordField label="Mật khẩu" name="password" form={form} required hiddenLabel />

            <Checkbox label="Ghi nhớ tài khoản" name="remember" form={form} />

            <div className="form-group col-md-12">
                <button type="submit" className="btn btn-info">
                    Đăng nhập
                </button>
            </div>
            <div className="row m-3">---- hoặc ----</div>
            <div className="form-group">
                <Link to="/dang-ky" className="btn btn-danger mr-3" role="button">
                    Tạo tài khoản
                </Link>
                <Link to="/" className="btn btn-warning" role="button">
                    Quên mật khẩu?
                </Link>
            </div>
        </form>
    );
}

export default LoginForm;
