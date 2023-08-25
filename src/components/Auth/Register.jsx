import { unwrapResult } from '@reduxjs/toolkit';
import { loading } from 'components/common/Loading/loadingSlice';
import SweetAlert from 'lib/SweetAlert';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { register } from './userSlice';

Register.propTypes = {};

function Register(props) {
    const dispatch = useDispatch();

    const handleSubmit = async (data) => {
        dispatch(loading(true));
        try {
            console.log('datav', data);
            const resultAction = await dispatch(register(data));
            unwrapResult(resultAction);
            SweetAlert.success('Đăng kí tài khoản thành công.');
        } catch (error) {
            SweetAlert.error(error.message);
        }
        dispatch(loading(false));
    };
    return (
        <div className="container">
            <div className="content">
                <div className="content-container">
                    <div className="content-header">
                        <h2 className="content-header-title">ĐĂNG KÝ TÀI KHOẢN</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <RegisterForm onSubmit={handleSubmit} />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row m-3">---- hoặc ----</div>
                                    <div className="form-group">
                                        <Link to="/login" className="btn btn-danger mr-3" role="button">
                                            Đăng nhập
                                        </Link>
                                        <Link to="/" className="btn btn-warning" role="button">
                                            Quên mật khẩu?
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
