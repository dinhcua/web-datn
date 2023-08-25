import Menu from 'components/common/Menu/Index';
import React from 'react';
import { useSelector } from 'react-redux';
import { castUser } from 'helpers/CastObject';

Profile.propTypes = {};

function Profile(props) {
    const user = castUser(useSelector((state) => state.user.current));

    return (
        <div className="container">
            <div className="content">
                <div className="content-container">
                    <div className="content-header">
                        <h2 className="content-header-title">QUẢN LÝ THÔNG TIN TÀI KHOẢN</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <Menu />
                        </div>
                        <div className="col-md-8">
                            <div className="panel panel-info">
                                <div className="panel-heading">Thông tin cá nhân</div>
                                <div className="panel-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Họ tên</th>
                                                <td>{user.full_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Cơ quan/Tổ chức</th>
                                                <td>{user.organization}</td>
                                            </tr>
                                            <tr>
                                                <th>Ngày sinh</th>
                                                <td>{user.cast.date_of_birth.format('DD/MM/YYYY')}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{user.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Số CMND</th>
                                                <td>{user.identity_card}</td>
                                            </tr>
                                            <tr>
                                                <th>Ngày cấp CMND</th>
                                                <td>{user.cast.identity_card_date.format('DD/MM/YYYY')}</td>
                                            </tr>
                                            <tr>
                                                <th>Nơi cấp CMND</th>
                                                <td>{user.identity_card_address}</td>
                                            </tr>
                                            <tr>
                                                <th>Số điện thoại</th>
                                                <td>{user.phone_number}</td>
                                            </tr>
                                            <tr>
                                                <th>Fax</th>
                                                <td>{user.fax}</td>
                                            </tr>
                                            <tr>
                                                <th>Website</th>
                                                <td>
                                                    <a href={`//${user.website}`} target="_blank" rel="noreferrer">
                                                        {user.website}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Địa chỉ</th>
                                                <td>{user.address}</td>
                                            </tr>
                                            <tr>
                                                <th>Ngày đăng kí</th>
                                                <td>{user.cast.created_at.format('DD/MM/YYYY H:mm:ss')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
