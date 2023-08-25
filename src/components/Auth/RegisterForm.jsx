import { yupResolver } from '@hookform/resolvers/yup';
import Address from 'api/Address';
import DatePicker from 'components/common/FormControls/DatePicker';
import InputField from 'components/common/FormControls/InputField';
import PasswordField from 'components/common/FormControls/PasswordField';
import Select from 'components/common/FormControls/Select';
import FullnameValidate from 'components/common/Validations/Fullname';
import PhoneNumberValidate from 'components/common/Validations/PhoneNumber';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const schema = yup.object().shape({
        email: yup.string().required('Email không được để trống').email('Email không hợp lệ'),
        full_name: yup.string().required('Họ tên không được bỏ trống').test(FullnameValidate),
        identity_card: yup.string().required('Số chứng minh nhân dân không được bỏ trống'),
        identity_card_date: yup.string().required('Ngày cấp không được bỏ trống'),
        identity_card_address: yup.string().required('Nơi cấp không được bỏ trống'),
        date_of_birth: yup.string().required('Ngày sinh không được bỏ trống'),
        phone_number: yup
            .string()
            .required('Số điện thoại không được bỏ trống')
            .matches(...PhoneNumberValidate),
        province: yup.string().required('Tỉnh/Thành phố không được bỏ trống'),
        district: yup.string().required('Quận/Huyện không được bỏ trống'),
        ward: yup.string().required('Xã/Phường/Thị trấn không được bỏ trống'),
        password: yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu ít nhất 6 kí tự'),
        re_password: yup
            .string()
            .required('Mật khẩu xác nhận không được bỏ trống')
            .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
    });

    const form = useForm({
        defaultValues: {
            email: '',
            full_name: '',
            identity_card: '',
            identity_card_date: new Date(),
            identity_card_address: '',
            date_of_birth: new Date(),
            phone_number: '',
            password: '',
            re_password: '',
        },
        resolver: yupResolver(schema),
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const list = await Address.getProvince();
                setProvinces(
                    list.map((item) => ({
                        label: item.name,
                        value: item.id,
                    }))
                );
            } catch (error) {}
        })();
    }, []);

    const onSubmit = async (data) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(data);
        }
    };

    const handleChangeProvince = async (value) => {
        try {
            setDistricts([]);
            const list = await Address.getDistrict(value);
            setDistricts(
                list.map((item) => ({
                    label: item.name,
                    value: item.id,
                }))
            );
        } catch (error) {}
    };

    const handleChangeDistrict = async (value) => {
        try {
            setWards([]);
            const list = await Address.getWard(value);
            setWards(
                list.map((item) => ({
                    label: item.name,
                    value: item.id,
                }))
            );
        } catch (error) {}
    };

    const handleFormReset = () => {
        form.reset();
        setDistricts([]);
        setWards([]);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="row">
                <InputField col={4} label="Họ tên" name="full_name" form={form} required />
                <InputField col={4} label="Tên cơ quan tổ chức" name="organization" form={form} />
                <DatePicker col={4} label="Ngày sinh" name="date_of_birth" form={form} required />
            </div>

            <div className="row">
                <InputField col={4} label="Số CMND" name="identity_card" form={form} required />
                <DatePicker col={4} label="Ngày cấp CMND" name="identity_card_date" form={form} required />
                <InputField col={4} label="Nơi cấp CMND" name="identity_card_address" form={form} required />
            </div>

            <div className="row">
                <InputField col={4} label="Số điện thoại" name="phone_number" form={form} required />
                <InputField col={4} label="Số fax" name="fax" form={form} />
                <InputField col={4} label="Website" name="website" form={form} />
            </div>

            <div className="row">
                <Select
                    col={4}
                    label="Tỉnh/Thành phố"
                    name="province"
                    options={provinces}
                    onChange={handleChangeProvince}
                    form={form}
                    required
                    loading={!provinces.length}
                />
                <Select
                    col={4}
                    label="Quận/Huyện"
                    name="district"
                    options={districts}
                    onChange={handleChangeDistrict}
                    form={form}
                    required
                    loading={!districts.length}
                />
                <Select col={4} label="Xã/Phường/Thị trấn" name="ward" options={wards} form={form} required loading={!wards.length} />
            </div>

            <div className="row">
                <InputField col={4} label="Email" name="email" form={form} required />
                <PasswordField col={4} label="Mật khẩu" name="password" form={form} required />
                <PasswordField col={4} label="Xác nhận mật khẩu" name="re_password" form={form} required />
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-info">
                    Đăng ký
                </button>
                <button type="button" className="btn btn-default ml-3" onClick={handleFormReset}>
                    Làm mới
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;
