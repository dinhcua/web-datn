import { FILE_STATUS, FILE_STATUS_CLASS_NAME } from 'constants/file';
import { ConvertDate } from 'helpers/ConvertDate';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

FileInfo.propTypes = {};

function FileInfo(props) {
    const { loading, file } = props;

    let finished_day = moment(file?.cast.accepted_at).add(file?.processing_time, 'h');

    return (
        <div className="col-md-6 mb-3 mb-xl-0">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h4 className="mb-0">Thông tin hồ sơ</h4>
                </div>
                <div className="panel-body">
                    {loading && <div className="sp sp-page sp-circle"></div>}
                    {!loading && (
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th style={{ width: '20%' }}>Mã hồ sơ</th>
                                    <td>{file.key}</td>
                                </tr>
                                <tr>
                                    <th>Thuộc thủ tục</th>
                                    <td>
                                        {file.procedure.name}
                                        <Link className="btn btn-sm btn-primary pull-right" to={`/chi-tiet-thu-tuc/${file.procedure.key}`}>
                                            Xem thủ tục
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Trạng thái</th>
                                    <td>
                                        <div className={`badge badge-pill badge-${FILE_STATUS_CLASS_NAME[file.status]}`}>
                                            {FILE_STATUS[file.status]}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Thời gian xử lý</th>
                                    <td>{ConvertDate(file.processing_time)}</td>
                                </tr>
                                <tr>
                                    <th>Ngày nộp</th>
                                    <td>{file.cast.created_at.format('hh:mm:ss DD-MM-YYYY')}</td>
                                </tr>
                                <tr>
                                    <th>Ngày tiếp nhận</th>
                                    <td>{file.status > 0 ? file.cast.accepted_at.format('hh:mm:ss DD-MM-YYYY') : `Chưa tiếp nhận`}</td>
                                </tr>
                                <tr>
                                    <th>Ngày trả dự kiến</th>
                                    <td>{file.status > 0 ? finished_day.format('hh:mm:ss DD-MM-YYYY') : `Chưa tiếp nhận`}</td>
                                </tr>
                                <tr>
                                    <th>Ngày trả</th>
                                    <td>{file.status > 1 ? file.cast.finished_at.format('hh:mm:ss DD-MM-YYYY') : `Chưa hoàn thành`}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileInfo;
