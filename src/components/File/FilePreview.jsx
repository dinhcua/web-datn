import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import FileInfo from './FileInfo';

FilePreview.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBackStep: PropTypes.func.isRequired,
    file: PropTypes.object.isRequired,
};

function FilePreview(props) {
    const { onSubmit, onBackStep, file } = props;
    console.log('file', file);
    const thanh_phan_ho_so = file.procedure.thanh_phan_ho_so;
    // console.log('file.file.thanh_phan_ho_so', file);
    return (
        <div>
            <div className="mb-3 text-danger">
                <b>* Chú ý: </b>
                <p>Cá nhân, tổ chức xác nhận lại toàn bộ thông tin hồ sơ cho chính xác sau đó ấn Nộp hồ sơ để hoàn tất thủ tục.</p>
            </div>

            <FileInfo file={file} />

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3>Xác nhận thông tin công dân, tổ chức</h3>
                </div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <th style={{ width: '18%' }}>Họ tên</th>
                                    <td>{file.user.full_name}</td>
                                </tr>
                                <tr>
                                    <th>Tên cơ quan</th>
                                    <td>{file.user.organization}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{file.user.email}</td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại</th>
                                    <td>{file.user.phone_number}</td>
                                </tr>
                                <tr>
                                    <th>Địa chỉ</th>
                                    <td>{file.user.address}</td>
                                </tr>
                                <tr>
                                    <th>Số CMND</th>
                                    <td>{file.user.identity_card}</td>
                                </tr>
                                <tr>
                                    <th>Ngày cấp</th>
                                    <td>{file.user.identity_card_date}</td>
                                </tr>
                                <tr>
                                    <th>Nơi cấp</th>
                                    <td>{file.user.identity_card_address}</td>
                                </tr>
                                <tr>
                                    <th>Fax</th>
                                    <td>{file.user.fax}</td>
                                </tr>
                                <tr>
                                    <th>Website</th>
                                    <td>{file.user.website}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3>Xác nhận thông tin hồ sơ</h3>
                </div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th style={{ width: '50%' }}>Tên thành phần</th>
                                    <th>Thông tin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {thanh_phan_ho_so.map((e, i) => (
                                    <tr key={i}>
                                        <td>{e}</td>
                                        <td>{file.file.thanh_phan_ho_so[i]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* 
                        <table className="table table-bordered table-hover">
                            <tbody>
                                {file.file.templateData.map((e, i) => (
                                    <tr key={i}>
                                        <th style={{ width: '30%' }}>{e.label}</th>
                                        <td>{e.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <button type="button" className="btn btn-default" onClick={onBackStep}>
                        <i className="fa fa-arrow-left"></i> Quay lại
                    </button>
                </div>
                <div className="col-md-6 text-right">
                    <button type="submit" className="btn btn-success" onClick={() => onSubmit(file)}>
                        <i className="fa fa-send"></i>&nbsp;&nbsp;Xác nhận nộp hồ sơ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilePreview;
