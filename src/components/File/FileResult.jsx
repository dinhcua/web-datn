import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

FileResult.propTypes = {
    file: PropTypes.object.isRequired,
};

function FileResult(props) {
    const { file } = props;

    return (
        <div>
            <div className="panel panel-success">
                <div className="panel-heading text-center">
                    <h4>Thành công</h4>
                </div>
                <div className="panel-body">
                    <div className="text-center text-success">
                        <h3>Đã nộp hồ sơ thành công</h3>
                    </div>
                    <div className="text-danger">
                        Vui lòng lưu lại nhưng thông tin sau để dễ dàng cho việc tra cứu và chỉnh sửa hồ sơ (Thông tin này chỉ được cấp 1 lần duy
                        nhất)
                    </div>
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <th style={{ width: '18%' }}>Mã hồ sơ</th>
                                    <td>{file.key}</td>
                                </tr>
                                {/* <tr>
                                    <th>Mã bí mật (Để sửa hồ sơ)</th>
                                    <td>
                                        <b className="text-danger">{file.access_key}</b>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-12 text-center">
                    <Link to="/" role="button" className="btn btn-success">
                        <i className="fa fa-home"></i>&nbsp;&nbsp;Về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FileResult;
