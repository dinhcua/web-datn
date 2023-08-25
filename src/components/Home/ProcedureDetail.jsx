import ProceduresApi from 'api/ProceduresApi';
import history from 'app/History';
import { loading } from 'components/common/Loading/loadingSlice';
import OrganizationsMenu from 'components/common/OranizationsMenu/Index';
import { setOption, setProcedure as setProcedureRedux, setStep } from 'components/File/fileSlice';
import Toastr from 'lib/Toastr';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

ProcedureDetail.propTypes = {};
function ProcedureDetail(props) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [procedure, setProcedure] = useState();
    console.log(id);
    useEffect(() => {
        getProcedureDetail();
    }, [id]);

    const getProcedureDetail = async () => {
        try {
            const { data } = await ProceduresApi.getByKey(id);
            console.log(data);
            setProcedure(data);
            dispatch(setProcedureRedux(data));
            let option_is_choose = data && data.options.length == 1;
            dispatch(setOption(option_is_choose ? data.options[0] : null));
            dispatch(setStep(option_is_choose ? 1 : 0));
        } catch (error) {
            Toastr.error('Lỗi load chi tiết thủ tục');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="content">
                <div className="content-container">
                    <div className="content-header">
                        <h2 className="content-header-title">CHI TIẾT THỦ TỤC</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <OrganizationsMenu />
                        </div>
                        <div className="col-md-8">
                            {!procedure && <div className="sp sp-page sp-circle"></div>}

                            {procedure && (
                                <div className="table-responsive">
                                    <RenderFunction className="mb-3" procedure={procedure} />

                                    <table className="table table-bordered table-hover">
                                        <tbody>
                                            <tr>
                                                <th style={{ width: '18%' }}>Tên thủ tục</th>
                                                <td>
                                                    <b>{procedure.name}</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Lĩnh vực</th>
                                                <td>{procedure.field.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Cơ quan thực hiện</th>
                                                <td>{procedure.eligible && procedure.first_organization.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Cách thức thực hiện</th>
                                                <td
                                                    dangerouslySetInnerHTML={{
                                                        __html: procedure.cach_thuc_thuc_hien,
                                                    }}
                                                ></td>
                                            </tr>
                                            <tr>
                                                <th>Đối tượng thực hiện</th>
                                                <td
                                                    dangerouslySetInnerHTML={{
                                                        __html: procedure.doi_tuong_thuc_hien,
                                                    }}
                                                ></td>
                                            </tr>
                                            <tr>
                                                <th>Trình tự thực hiện</th>
                                                <td
                                                    dangerouslySetInnerHTML={{
                                                        __html: procedure.trinh_tu_thuc_hien,
                                                    }}
                                                ></td>
                                            </tr>
                                            <tr>
                                                <th>Thời hạn giải quyết</th>
                                                <td
                                                    dangerouslySetInnerHTML={{
                                                        __html: procedure.thoi_han_giai_quyet,
                                                    }}
                                                ></td>
                                            </tr>
                                            <tr>
                                                <th>Lệ phí</th>
                                                <td
                                                    dangerouslySetInnerHTML={{
                                                        __html: procedure.le_phi,
                                                    }}
                                                ></td>
                                            </tr>
                                            {/* <tr>
                                                <th>Thành phần hồ sơ</th>
                                                <td>
                                                    <p>{procedure.thanh_phan_ho_so}</p>
                                                </td>
                                            </tr> */}
                                            <tr>
                                                <th>Số lượng bộ hồ sơ</th>
                                                <td>{procedure.so_luong_ho_so} bộ</td>
                                            </tr>
                                            <tr>
                                                <th>Yêu cầu điều kiện</th>
                                                <td
                                                    dangerouslySetInnerHTML={{
                                                        __html: procedure.yeu_cau_dieu_kien,
                                                    }}
                                                ></td>
                                            </tr>
                                            <tr>
                                                <th>Căn cứ pháp lý</th>
                                                <td
                                                    dangerouslySetInnerHTML={{
                                                        __html: procedure.can_cu_phap_ly,
                                                    }}
                                                ></td>
                                            </tr>
                                            <tr>
                                                <th>Biểu mẫu đính kèm</th>
                                                {/* <td>
                                                    {procedure.files.map((e, i) => (
                                                        <div key={i}>
                                                            {e.title}&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <a
                                                                href={`${process.env.REACT_APP_ROOT_STORAGE}${e.path}`}
                                                                role="button"
                                                                className="btn btn-sm btn-success"
                                                            >
                                                                <i className="fa fa-download"></i> Tải về
                                                            </a>
                                                        </div>
                                                    ))}
                                                </td> */}
                                            </tr>
                                            <tr>
                                                <th>Kết quả thực hiện</th>
                                                <td
                                                    dangerouslySetInnerHTML={{
                                                        __html: procedure.ket_qua_thuc_hien,
                                                    }}
                                                ></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <RenderFunction className="mt-3" procedure={procedure} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RenderFunction(props) {
    const { procedure, className } = props;
    return (
        <div className={`row ${className}`}>
            <div className="col-md-6">
                <button type="button" className="btn btn-default" onClick={() => history.goBack()}>
                    <i className="fa fa-arrow-left"></i> Quay lại
                </button>
            </div>
            <div className="col-md-6 text-right">
                {procedure.eligible && (
                    <Link to={`/nop-ho-so`} role="button" className="btn btn-primary">
                        <i className="fa fa-send"></i>&nbsp;&nbsp; Nộp hồ sơ
                    </Link>
                )}
            </div>
        </div>
    );
}

export default ProcedureDetail;
