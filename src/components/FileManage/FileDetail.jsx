import FilesApi from 'api/FilesApi';
import { loading } from 'components/common/Loading/loadingSlice';
import { castTimestamps } from 'helpers/CastObject';
import SweetAlert from 'lib/SweetAlert';
import Toastr from 'lib/Toastr';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FileAttachs from './FileAttachs';
import FileCheckPermission from './FileCheckPermission';
import FileInfo from './FileInfo';
import FileProcessing from './FileProcessing';
import FileTemplate from './FileTemplate';
import UserInfo from './UserInfo';
import history from 'app/History';

FileDetail.propTypes = {};

function FileDetail(props) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [accessKey, setAccessKey] = useState();
    const [checkPermission, setCheckPermission] = useState(false);
    const [file, setFile] = useState();
    const [fileSteps, setFileSteps] = useState([]);

    useEffect(() => {
        getFileDetail();
        getFileSteps();
    }, [id, accessKey]);

    const getFileDetail = async () => {
        try {
            const { data } = await FilesApi.getById(id, accessKey);

            setFile(castTimestamps(data));
        } catch (error) {
            setCheckPermission(true);
            Toastr.error('Bạn không có quyền truy cập hồ sơ này');
            console.error(error);
        }
    };

    const getFileSteps = async () => {
        try {
            const { data } = await FilesApi.getFileSteps(id);
            setFileSteps(data);
        } catch (error) {
            Toastr.error('Lỗi load quy trình hồ sơ');
            console.error(error);
        }
    };

    const handleDelete = async () => {
        SweetAlert.confirm(`Bạn có chắc muốn hủy hồ sơ này?<br>Thao tác không thể hoàn tác`, async () => {
            dispatch(loading(true));
            try {
                const res = await FilesApi.cancel(id);
                if (res.success) {
                    Toastr.success(res.message);
                    history.goBack();
                    // getFileDetail();
                }
            } catch (error) {
                SweetAlert.error(error.message);
            }
            dispatch(loading(false));
        });
    };

    const handleSubmit = (data) => {
        setCheckPermission(false);
        setAccessKey(data);
    };

    return (
        <div className="container">
            <div className="content">
                <div className="content-container">
                    <div className="content-header">
                        <h2 className="content-header-title">CHI TIẾT HỒ SƠ</h2>
                    </div>

                    <div className="row">
                        {checkPermission && <FileCheckPermission onSubmit={handleSubmit} />}
                        {!checkPermission && (
                            <>
                                <FileInfo loading={!file} file={file} />
                                <FileProcessing loading={!file} steps={fileSteps} />
                                <UserInfo loading={!file} user_info={file?.user_info} />
                                <FileAttachs loading={!file} files={file?.files} />
                                {/* 
                                <FileTemplate loading={!file} data={file?.data} onDelete={handleDelete} disabledCancel={handleDelete} /> */}
                            </>
                        )}
                    </div>
                    <div className="row">
                        <div className="panel-footer text-right">
                            <button className="btn btn-sm btn-danger" onClick={handleDelete} disabled={file?.status != 0}>
                                <i className="fa fa-close"></i>&nbsp;&nbsp;HỦY HỒ SƠ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileDetail;
