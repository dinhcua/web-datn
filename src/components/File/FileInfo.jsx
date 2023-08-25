import { ConvertDate } from 'helpers/ConvertDate';
import React from 'react';

FileInfo.propTypes = {};

function FileInfo(props) {
    const { file } = props;

    return (
        <div>
            <div className="panel panel-default mb-3">
                <div className="panel-heading">
                    <h3>Thông tin hồ sơ</h3>
                </div>
                <div className="panel-body">
                    <h4>
                        {file.procedure.key} - {file.procedure.name}
                    </h4>
                    {/* <div className="row mb-1">
                        <div className="col-md-2">Mức độ:</div>
                        <div className="col-md-6">
                            <span className="label label-warning">Mức độ {file.procedure.level}</span>
                        </div>
                    </div> */}
                    <div className="row mb-1">
                        <div className="col-md-2">Nơi tiếp nhận hồ sơ:</div>
                        <div className="col-md-6">{file.procedure.first_organization.name}</div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-md-2">Thời hạn giải quyết:</div>
                        <b className="col-md-6 ">{ConvertDate(24)}</b>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileInfo;
