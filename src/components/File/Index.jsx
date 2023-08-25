import FilesApi from 'api/FilesApi';
import history from 'app/History';
import { loading } from 'components/common/Loading/loadingSlice';
import { FILE_STEPS } from 'constants/file';
import { ConvertFormFile } from 'helpers/ConvertFormFile';
import { smoothScroll } from 'helpers/SmoothScroll';
import SweetAlert from 'lib/SweetAlert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileChooseOption from './FileChooseOption';
import FileFill from './FileFill';
import FilePreview from './FilePreview';
import FileResult from './FileResult';
import { clearFile, setOption, setStep, setUser } from './fileSlice';
import FileUser from './FileUser';
import Toastr from 'lib/Toastr';
//9874

File.propTypes = {};

function File(props) {
    const dispatch = useDispatch();
    const file = useSelector((state) => state.file);

    const [fileData, setFileData] = useState(null);
    const [fileResult, setFileResult] = useState({});

    useEffect(() => {
        window.onbeforeunload = () => {
            dispatch(clearFile());
            return 'Bạn có chắc muốn rời khỏi trang này? Mọi thông tin sẽ không được lưu lại';
        };

        return () => {
            window.onbeforeunload = () => {};
        };
    }, []);

    if (!file.procedure && !fileData) {
        history.goBack();
        return <div></div>;
    }
    // const filestep = file.step;

    const handleBackStep = () => {
        if (file.step > 0) {
            dispatch(setStep(file.step - 1));
            smoothScroll();
        }
    };

    const handleNextStep = () => {
        smoothScroll();
        dispatch(setStep(file.step + 1));
    };

    const handleChooseOption = (option) => {
        dispatch(setOption(option));
        handleNextStep();
    };

    const handleFileUser = (user) => {
        dispatch(setUser(user));
        handleNextStep();
    };

    const handleFileFill = (data) => {
        setFileData(data);
        handleNextStep();
    };

    const confirmFileSubmit = async (data) => {
        // const formData = ConvertFormFile(data);
        dispatch(loading(true));
        try {
            data.file.file_create_day = new Date();
            const res = await FilesApi.fileSubmit(data);
            if (res.success) {
                SweetAlert.success(res.message);
                setFileResult(res.data);
                dispatch(clearFile());
                smoothScroll();
            } else {
                SweetAlert.error(res.message);
            }
        } catch (error) {
            SweetAlert.error(error.message);
        }
        dispatch(loading(false));
    };

    const handleFileSubmit = (data) => {
        SweetAlert.confirm(
            'Bạn có chắc chắn muốn nộp hồ sơ này?',
            async () => {
                handleNextStep();
                await confirmFileSubmit(data);
            },
            'question',
            'Xác nhận'
        );
    };

    const fileStep = () => {
        switch (file.step) {
            case 0:
                return <FileChooseOption onSubmit={handleChooseOption} />;
            case 1:
                return <FileUser onSubmit={handleFileUser} onBackStep={handleBackStep} />;
            case 2:
                return <FileFill onSubmit={handleFileFill} onBackStep={handleBackStep} />;
            case 3:
                return <FilePreview file={{ ...file, file: fileData }} onSubmit={handleFileSubmit} onBackStep={handleBackStep} />;
            case 4:
                return <FileResult file={fileResult} />;
        }
    };

    return (
        <div className="container">
            <div className="content">
                <div className="content-container">
                    <div className="content-header">
                        <h2 className="content-header-title">NỘP HỒ SƠ</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="box-steps">
                                <div className="box-body">
                                    {FILE_STEPS.map((e, i) => (
                                        <div key={i} className={`item ${i <= file.step ? 'active' : ''}`}>
                                            <div className="icon">
                                                <i className={e.icon}></i>
                                            </div>
                                            <div className="text">
                                                <div className="number">{i + 1}</div> {e.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {fileStep()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default File;
