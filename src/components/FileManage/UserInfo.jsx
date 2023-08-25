import moment from 'moment';
import React from 'react';

UserInfo.propTypes = {};

function UserInfo(props) {
    const { loading, user_info } = props;

    return (
        <div className="col-md-12 mb-3 mb-xl-0">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h4 className="mb-0">Thông tin cá nhân, tổ chức</h4>
                </div>
                <div className="panel-body">
                    {loading && <div className="sp sp-page sp-circle"></div>}
                    {!loading && (
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th style={{ width: '20%' }}>Người nộp</th>
                                    <td>{user_info.full_name}</td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại</th>
                                    <td>{user_info.phone_number}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{user_info.email}</td>
                                </tr>
                                <tr>
                                    <th>Cơ quan</th>
                                    <td>{user_info.organization}</td>
                                </tr>
                                <tr>
                                    <th>Số CMND</th>
                                    <td>{user_info.identity_card}</td>
                                </tr>
                                <tr>
                                    <th>Ngày cấp</th>
                                    <td>{moment(user_info.identity_card_date).format('DD-MM-YYYY')}</td>
                                </tr>
                                <tr>
                                    <th>Nơi cấp</th>
                                    <td>{user_info.identity_card_address}</td>
                                </tr>
                                <tr>
                                    <th>Fax</th>
                                    <td>{user_info.fax}</td>
                                </tr>
                                <tr>
                                    <th>Website</th>
                                    <td>{user_info.website}</td>
                                </tr>
                                <tr>
                                    <th>Địa chỉ</th>
                                    <td>{user_info.address}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
