import FilesApi from 'api/FilesApi';
import Pagination from 'components/common/@extensions/Pagination';
import Menu from 'components/common/Menu/Index';
import { FILE_STATUS, FILE_STATUS_CLASS_NAME } from 'constants/file';
import { castTimestamps } from 'helpers/CastObject';
import { smoothScroll } from 'helpers/SmoothScroll';
import Toastr from 'lib/Toastr';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

FileManage.propTypes = {};

function FileManage(props) {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [totalRecords, setTotalRecords] = useState(10);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = useSelector((state) => state.user.current);

    useEffect(() => {
        fetchData();
    }, [page, perPage, search]);

    const fetchData = async () => {
        try {
            setLoading(true);
            smoothScroll();
            // console.log('ff', { page, perPage, q: search });
            const { data, total } = await FilesApi.getFiles({ page, perPage, id_user: user.id });
            setTotalRecords(total);
            setData(data);
            setLoading(false);
        } catch (error) {
            Toastr.error('Lỗi tải dữ liệu hồ sơ');
            console.error(error);
        }
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handlePerPageChange = (value) => {
        setPerPage(value);
    };

    const handleSearch = (data) => {
        setSearch(data);
    };

    return (
        <div className="container">
            <div className="content">
                <div className="content-container">
                    <div className="content-header">
                        <h2 className="content-header-title">QUẢN LÝ HỒ SƠ CÁ NHÂN</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <Menu />
                        </div>
                        <div className="col-md-8">
                            {loading && <div className="sp sp-page sp-circle"></div>}

                            {!loading && (
                                <div className="table-responsive">
                                    <p>
                                        Tìm thấy <span className="text-danger">{totalRecords}</span> kết quả
                                    </p>
                                    <table className="table table-striped table-bordered table-hover text-center">
                                        <thead>
                                            <tr role="row" className="bg-primary">
                                                <th>STT</th>
                                                <th>Mã H.S</th>
                                                <th>Thủ tục</th>
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
                            )}

                            <div className="text-center">
                                <Pagination totalRecords={totalRecords} perPage={perPage} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileManage;
