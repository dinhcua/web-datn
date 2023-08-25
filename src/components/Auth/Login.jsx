import { unwrapResult } from '@reduxjs/toolkit';
import { loading } from 'components/common/Loading/loadingSlice';
import SweetAlert from 'lib/SweetAlert';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from './LoginForm';
import { login } from './userSlice';
import Storages from 'constants/storage';

Login.propTypes = {};

function Login(props) {
    const dispatch = useDispatch();

    const handleSubmit = async (data) => {
        dispatch(loading(true));
        try {
            const resultAction = await dispatch(login(data));
            const result = unwrapResult(resultAction);

            if(data.remember) {
                let data_account = JSON.stringify(data);
                localStorage.setItem(Storages.REMEMBER_ACCOUNT, window.btoa(data_account));
            }
        } catch (error) {
            if (error.name == 401) {
                SweetAlert.error('Thông tin đăng nhập không chính xác');
            } else {
                SweetAlert.error(error.message);
            }
        }
        dispatch(loading(false));
    };

    let data_account = {};
    const dataStore = localStorage.getItem(Storages.REMEMBER_ACCOUNT);

    if(dataStore) {
        data_account = JSON.parse(window.atob(dataStore));
    }

    return (
        <div className="container container-md">
            <div className="content">
                <div className="content-container">
                    <div className="content-header">
                        <h2 className="content-header-title">ĐĂNG NHẬP CHO CÔNG DÂN/DOANH NGHIỆP</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <LoginForm onSubmit={handleSubmit} dataAccount={data_account}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
