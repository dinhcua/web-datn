import Template from 'components/common/FormControls/Template';
import Toastr from 'lib/Toastr';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FileInfo from './FileInfo';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/common/FormControls/InputField';

FileFill.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBackStep: PropTypes.func.isRequired,
};

function FileFill(props) {
    const { onSubmit, onBackStep } = props;

    const file = useSelector((state) => state.file);
    const [attachs, setAttachs] = useState([]);
    const [templateData, setTemplateData] = useState([]);

    const thanh_phan_ho_so = file.procedure.thanh_phan_ho_so;

    const handleChangeFile = (i, file) => {
        let newArr = [...attachs];
        newArr[i] = file;
        setAttachs(newArr);
    };

    const schema = yup.object().shape({
        address: yup.string().required('Địa chỉ không được bỏ trống'),
    });

    let defaultValues = {
        thanh_phan_ho_so: [''],
    };

    const form = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const handleChangeTemplateData = (data) => {
        setTemplateData(data);
    };

    const handleSubmit = () => {
        let flag = true;
        for (let i = 0; i < attachs.length; i++) {
            if (!attachs[i]) {
                flag = false;
            }
        }
        if (!flag) {
            Toastr.error('Vui lòng tải lên đầy đủ tệp đính kèm theo quy định.');
            return;
        }
        flag = true;
        for (let i = 0; i < templateData.length; i++) {
            if (!templateData[i].value) {
                flag = false;
            }
        }
        if (!flag) {
            Toastr.error('Vui lòng điền đầy đủ biểu mẫu theo quy định.');
            return;
        }
        const thanh_phan_ho_so = form.getValues('thanh_phan_ho_so');
        onSubmit({ attachs, templateData, thanh_phan_ho_so });
    };

    return (
        <div>
            <FileInfo file={file} />

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3>Thành phần hồ sơ</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        {thanh_phan_ho_so.map((thanh_phan, index) => {
                            return (
                                <div className="row">
                                    <InputField label={thanh_phan} name={`thanh_phan_ho_so[${index}]`} form={form} required />
                                </div>
                            );
                        })}
                    </form>
                </div>
            </div>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3>Biểu mẫu giấy tờ</h3>
                </div>
                <div className="panel-body">
                    <div className="mb-3">
                        <b className="text-danger">* Lưu ý: </b>
                        <p>Cá nhân hoặc tổ chức vui lòng cung cấp đầy đủ thông tin theo yêu cầu của hồ sơ.</p>
                    </div>

                    {/* <Template templates={JSON.parse(file.option.template.data)} onChangeValue={handleChangeTemplateData} /> */}

                    <div className="row">
                        <div className="col-md-6">
                            <button type="button" className="btn btn-default" onClick={onBackStep}>
                                <i className="fa fa-arrow-left"></i> Quay lại
                            </button>
                        </div>
                        <div className="col-md-6 text-right">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                Tiếp tục <i className="fa fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileFill;
