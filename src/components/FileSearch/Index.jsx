import FilesApi from 'api/FilesApi';
import Pagination from 'components/common/@extensions/Pagination';
import { FILE_STATUS, FILE_STATUS_CLASS_NAME } from 'constants/file';
import { castTimestamps } from 'helpers/CastObject';
import { smoothScroll } from 'helpers/SmoothScroll';
import Toastr from 'lib/Toastr';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import history from 'app/History';

FileSearch.propTypes = {};

function FileSearch(props) {
    const location = useLocation();
    const [totalRecords, setTotalRecords] = useState(10);
    const [data, setData] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);

        return {
            page: 1,
            perPage: 10,
            ...params,
        };
    }, [location.search]);

    // const setFilters = (value) => {
    //     const filters = {
    //         ...queryParams,
    //         ...value,
    //     };

    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryString.stringify(filters),
    //     });
    // };

    const form = useForm({
        defaultValues: {
            key: '',
            indentity_card: '',
        },
    });

    const { register } = form;

    // useEffect(() => {
    //     fetchData();
    // }, [queryParams]);

    const fetchData = async () => {
        try {
            setLoading(true);
            smoothScroll();
            const { data, total } = await FilesApi.getAll(queryParams);
            setTotalRecords(total);
            setData(data);
            setLoading(false);
        } catch (error) {
            Toastr.error('Lỗi tải dữ liệu hồ sơ');
            console.error(error);
        }
    };

    const handlePageChange = (page) => {
        // setFilters({ page });
    };

    const handleSubmit = async (search) => {
        // setFilters(data);
        console.log(search);
        const { data, total } = await FilesApi.getAll({ page: 1, perPage: 10, key: search.key, identity_card: search.identity_card });
        setData(data);
        console.log('d', data);
        setIsShow(true);
        setTotalRecords(total);
    };

    return (
        <div className="container">
            <div className="content">
                <div className="content-container">
                    <div className="content-header">
                        <h2 className="content-header-title">TRA CỨU HỒ SƠ</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <h4 className="mb-0">Tra cứu thông tin</h4>
                                </div>
                                <form onSubmit={form.handleSubmit(handleSubmit)}>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label>Mã hồ sơ</label>
                                                <input {...register('key')} type="text" className="form-control" />
                                            </div>
                                            {/* <div className="col-md-4 form-group">
                                                <label>Tên người nộp</label>
                                                <input {...register('full_name')} type="text" className="form-control" />
                                            </div> */}
                                            <div className="col-md-6 form-group">
                                                <label>Số CMND/CCCD người nộp</label>
                                                <input {...register('identity_card')} type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-footer text-center">
                                        <button type="submit" className="btn btn-success">
                                            <i className="fa fa-search"></i>&nbsp;&nbsp;Tra cứu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {loading && <div className="sp sp-page sp-circle"></div>}

                            {isShow && !loading && (
                                <>
                                    <div className="table-responsive">
                                        <p>
                                            Tìm thấy <span className="text-danger">{totalRecords}</span> kết quả
                                        </p>
                                        <table className="table table-striped table-bordered table-hover text-center">
                                            <thead>
                                                <tr role="row" className="bg-primary">
                                                    <th>STT</th>
                                                    <th style={{ width: '10%' }}>Mã H.S</th>
                                                    <th>Thủ tục</th>
                                                    <th>Người nộp</th>
                                                    <th>Trạng thái</th>
                                                    <th>Ngày nộp</th>
                                                    <th>Lựa chọn</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((item, index) => {
                                                    item = castTimestamps(item);
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.key}</td>
                                                            <td>{item.procedure.name}</td>
                                                            <td>{item.user.full_name}</td>
                                                            <td>
                                                                <span className={`label label-${FILE_STATUS_CLASS_NAME[item.status]}`}>
                                                                    {FILE_STATUS[item.status]}
                                                                </span>
                                                            </td>
                                                            <td>{item.cast.created_at.format('hh:mm:ss DD-MM-YYYY')}</td>
                                                            <td>
                                                                <Link to={`/chi-tiet-ho-so/${item.id}`} className="btn btn-sm btn-success">
                                                                    Xem
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-center">
                                        <Pagination
                                            totalRecords={totalRecords}
                                            perPage={Number.parseInt(queryParams.perPage)}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileSearch;
