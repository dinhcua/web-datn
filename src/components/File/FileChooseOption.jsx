import history from 'app/History';
import Toastr from 'lib/Toastr';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

FileChooseOption.propTypes = {};

function FileChooseOption(props) {
    const { onSubmit } = props;

    const file = useSelector((state) => state.file);
    const [option, setOption] = useState();

    const handleChange = (e) => {
        setOption(e.target.value);
    };

    const handleSubmit = () => {
        // if (!option) {
        //     Toastr.error('Vui lòng chọn trường hợp giải quyết');
        //     return;
        // }
        // console.log(file.procedure.options);
        let opt = file.procedure.options[0];
        onSubmit(opt);
    };

    useEffect(() => {
        console.log('option', option);
        handleSubmit();
    }, []);

    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-heading">Chọn trường hợp hồ sơ</div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-2">Trường hợp giải quyết</div>
                        <div className="col-md-6 form-group">
                            <select className="form-control" onChange={handleChange}>
                                <option value="">-- Chọn trường hợp giải quyết --</option>
                                {file.procedure.options.map((e, i) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-default" onClick={() => history.goBack()}>
                                <i className="fa fa-arrow-left"></i> Quay lại
                            </button>
                        </div>
                        <div className="col-md-6 text-right">
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Tiếp tục <i className="fa fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileChooseOption;
