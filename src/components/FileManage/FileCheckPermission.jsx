import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

FileCheckPermission.propTypes = {};

function FileCheckPermission(props) {
    const { onSubmit } = props;

    const [key, setKey] = useState();
    const [captcha, setCaptcha] = useState();

    const disabledSubmit = !key || !captcha;

    const handleChangeKey = (e) => {
        setKey(e.target.value);
    };

    const handleChangeCaptcha = (data) => {
        setCaptcha(data);
    };

    const handleSubmit = () => {
        onSubmit(key);
    };

    return (
        <div className="col-md-6 mb-3 mb-xl-0">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h4 className="mb-0">Nhập mã truy cập</h4>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <p className="text-danger">- Mã truy cập được cung cấp khi công dân nộp hồ sơ thành công.</p>
                            <input type="text" className="form-control" onChange={handleChangeKey} />
                        </div>
                        <div className="col-md-12">
                            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={handleChangeCaptcha} />
                        </div>
                    </div>
                </div>
                <div className="panel-footer text-right">
                    <button className="btn btn-sm btn-success" onClick={handleSubmit} disabled={disabledSubmit}>
                        <i className="fa fa-unlock-alt"></i>&nbsp;&nbsp;TRUY CẬP
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FileCheckPermission;
