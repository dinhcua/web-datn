import { yupResolver } from '@hookform/resolvers/yup';
import Address from 'api/Address';
import DatePicker from 'components/common/FormControls/DatePicker';
import InputField from 'components/common/FormControls/InputField';
import Select from 'components/common/FormControls/Select';
import FullnameValidate from 'components/common/Validations/Fullname';
import PhoneNumberValidate from 'components/common/Validations/PhoneNumber';
import { castUser } from 'helpers/CastObject';
import Toastr from 'lib/Toastr';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import FileInfo from './FileInfo';
import PropTypes from 'prop-types';
import AuthApi from 'api/AuthApi';
import SweetAlert from 'lib/SweetAlert';

FileUser.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBackStep: PropTypes.func.isRequired,
};

function FileUser(props) {
    const { onSubmit, onBackStep } = props;

    const user = useSelector((state) => state.user.current);
    const loggedIn = !!user.id;

    const file = useSelector((state) => state.file);

    const schema = yup.object().shape({
        full_name: yup.string().required('Họ tên không được bỏ trống').test(FullnameValidate),
        phone_number: yup
            .string()
            .required('Số điện thoại không được bỏ trống')
            .matches(...PhoneNumberValidate),
        province: yup.string().required('Tỉnh/Thành phố không được bỏ trống'),
        identity_card_date: yup.string().required('Ngày CMND/CCCD cấp không được bỏ trống'),
        identity_card: yup.string().required('Số CMND/CCCD không được bỏ trống'),
        identity_card_address: yup.string().required('Nơi cấp CMND/CCCD không được bỏ trống'),
        district: yup.string().required('Quận/Huyện không được bỏ trống'),
        ward: yup.string().required('Xã/Phường/Thị trấn không được bỏ trống'),
        address: yup.string().required('Địa chỉ không được bỏ trống'),
    });

    let defaultValues = {
        email: '',
        full_name: '',
        identity_card: '',
        identity_card_date: new Date(),
        date_of_birth: new Date(),
        identity_card_address: '',
        phone_number: '',
    };

    if (loggedIn) {
        let nUser = castUser(user);
        defaultValues = {
            id: nUser.id,
            email: nUser.email,
            full_name: nUser.full_name,
            organization: nUser.organization,
            identity_card: nUser.identity_card,
            identity_card_date: nUser.cast.identity_card_date.toDate(),
            date_of_birth: nUser.cast.date_of_birth.toDate(),
            identity_card_address: nUser.identity_card_address,
            phone_number: nUser.phone_number,
            fax: nUser.fax,
            website: nUser.website,
        };
    }

    const form = useForm({
        defaultValues,
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
        mountAddress(user.ward);
    }, []);

    const mountAddress = async (ward) => {
        try {
            const data = await Address.getAddress(ward);
            setWards(
                data.wards.map((item) => ({
                    label: item.name,
                    value: item.id,
                }))
            );
            setDistricts(
                data.districts.map((item) => ({
                    label: item.name,
                    value: item.id,
                }))
            );
            form.setValue('province', data.province);
            form.setValue('district', data.district);
            form.setValue('ward', data.ward);
        } catch (error) {
            console.error(error);
            Toastr.error('Lỗi load danh sách Quận/Huyện, Xã/Phường');
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

    const handleSubmit = async (user) => {
        // user.identity_card_date = user.identity_card_date.toISOString();

        let ward_name = wards.filter((e) => e.value == user.ward)[0].label;
        let district_name = districts.filter((e) => e.value == user.district)[0].label;
        let province_name = provinces.filter((e) => e.value == user.province)[0].label;

        user.address += `, ${ward_name}, ${district_name}, ${province_name}`;
        user.password = user.phone_number;
        try {
            if (!loggedIn) {
                const res = await AuthApi.register(user);
                if (res.success) {
                    SweetAlert.success(res.message);
                    onSubmit(res.data.user);
                } else {
                    SweetAlert.error(res.message);
                }
            } else {
                onSubmit(user);
            }
        } catch (error) {
            SweetAlert.error(error.message);
        }

        //
    };

    return (
        <div>
            <FileInfo file={file} />

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3>Nhập thông tin công dân</h3>
                </div>
                <div className="panel-body">
                    {!loggedIn && (
                        <div className="mb-3">
                            <b className="text-danger">* Mẹo: </b>{' '}
                            <Link className="text-warning" to="/dang-nhap">
                                Đăng nhập
                            </Link>{' '}
                            để thông tin của bạn được điền tự động và quản lý hồ sơ dễ dàng hơn.
                        </div>
                    )}
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="row">
                            <InputField col={4} label="Họ tên" name="full_name" form={form} required />
                            <DatePicker col={4} label="Ngày sinh" name="date_of_birth" form={form} required />
                            <InputField col={4} label="Email" name="email" form={form} required />
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
                            <InputField label="Địa chỉ cụ thể" name="address" form={form} required />
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <button type="button" className="btn btn-default" onClick={onBackStep}>
                                    <i className="fa fa-arrow-left"></i> Quay lại
                                </button>
                            </div>
                            <div className="col-md-6 text-right">
                                <button type="submit" className="btn btn-primary">
                                    Tiếp tục <i className="fa fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FileUser;
