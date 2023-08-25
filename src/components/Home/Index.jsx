import FieldsApi from 'api/FieldsApi';
import OrganizationsApi from 'api/OrganizationsApi';
import ProceduresApi from 'api/ProceduresApi';
import Pagination from 'components/common/@extensions/Pagination';
import OrganizationsMenu from 'components/common/OranizationsMenu/Index';
import Toastr from 'lib/Toastr';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

Procedure.propTypes = {};

const PROCEDURE_LEVELS = [
    { label: 'Mức độ 1', value: 1 },
    { label: 'Mức độ 2', value: 2 },
    { label: 'Mức độ 3', value: 3 },
    { label: 'Mức độ 4', value: 4 },
];

function Procedure(props) {
    const [totalRecords, setTotalRecords] = useState(0);
    const [data, setData] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [dataOrganizations, setDataOrganizations] = useState([]);
    const [organizationId, setOrganizationId] = useState();
    const [fieldId, setFieldId] = useState();
    const [level, setLevel] = useState(0);
    const [dataFields, setDataFields] = useState([]);
    const [loading, setLoading] = useState(true);

    const typingTimeout = useRef(null);

    const queryParams = {
        page: 1,
        perPage: 10,
    };

    useEffect(() => {
        fetchData();
        getAllOragnizations();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data, total } = await ProceduresApi.getAll(queryParams);
            setTotalRecords(total);
            setProcedures(data);
            setData(data);
            setLoading(false);
        } catch (error) {
            Toastr.error('Lỗi tải dữ liệu thủ tục');
            console.error(error);
        }
    };

    const getAllOragnizations = async () => {
        try {
            const { data } = await OrganizationsApi.getAll();
            setDataOrganizations(data);
        } catch (error) {
            Toastr.error('Lỗi tải dữ liệu cơ quan');
            console.error(error);
        }
    };

    const getAllFields = async (organization) => {
        try {
            setLoading(true);
            const procedures = await ProceduresApi.getAll({ ...queryParams, organization: organization.organization });
            setTotalRecords(procedures.total);
            setData(procedures.data);
            setLoading(false);
            // setLevel(0);
            const fields = await FieldsApi.getAll(organization);
            setDataFields(fields.data);
        } catch (error) {
            Toastr.error('Lỗi tải dữ liệu lĩnh vực');
            console.error(error);
        }
    };

    const handlePageChange = async (page) => {
        const queryParams = {
            page: page,
            perPage: 10,
        };
        const { data, total } = await ProceduresApi.getAll(queryParams);
        setTotalRecords(total);
        setData(data);
    };

    const handleChangeOrganization = (event) => {
        setOrganizationId(Number.parseInt(event.target.value));
    };

    useEffect(() => {
        if (organizationId) {
            getAllFields({ organization: organizationId });
        }
    }, [organizationId]);

    // const

    // useEffect(() => {
    // // if (fieldId) {
    //     let pros = await ProceduresApi.getAll({
    //         page: 1,
    //         perPage: 100,
    //     }
    // );
    //     console.log('ff', procedures.length);

    //     const dataField = pros.filter((procedure) => {
    //         if (procedure.id_field === fieldId) return procedure;
    //     });
    //     console.log('jjj', dataField.length);
    //     setTotalRecords(dataField.length);
    // setLevel(0);
    // setData(dataField);
    // }
    // }, [fieldId]);

    const handleChangeField = async (event) => {
        const fieldId = Number.parseInt(event.target.value);
        if (fieldId) {
            const pros = await ProceduresApi.getAll({ page: 1, perPage: 100 });

            const dataField = pros.data.filter((procedure) => {
                if (procedure.id_field === fieldId) return procedure;
            });
            setTotalRecords(dataField.length);
            setData(dataField);
        } else {
            const { data } = await ProceduresApi.getAll({ page: 1, perPage: 100, organization: organizationId });
            setTotalRecords(data.length);
            setData(data);
        }
    };

    // const handleChangeLevel = (event) => {
    //     setLevel(Number.parseInt(event.target.value));
    // };

    // useEffect(() => {
    //     const data = procedures.filter((procedure) => {
    //         if (procedure.id_field === fieldId) return procedure;
    //     });
    //     const dataField = data.filter((procedure) => {
    //         if (level === 0) return procedure;
    //         if (procedure.level === level) return procedure;
    //     });
    //     setTotalRecords(dataField.length);
    //     setData(dataField);
    // }, [level]);

    const searchProcedures = async (searchText) => {
        const procedures = await ProceduresApi.getAll({ ...queryParams, organization: organizationId, search: searchText });
        setTotalRecords(procedures.total);
        setData(procedures.data);
    };

    const handleChangeSearch = (event) => {
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }
        typingTimeout.current = setTimeout(() => {
            searchProcedures(event.target.value);
        }, 500);
    };

    return (
        <div className="container">
            <div className="content">
                <div className="content-container">
                    <div className="content-header">
                        <h2 className="content-header-title">DANH SÁCH THỦ TỤC</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <OrganizationsMenu setOrganizationId={setOrganizationId} setFieldId={setFieldId} setLevel={setLevel} />
                        </div>
                        <div className="col-md-8">
                            <div className="panel panel-info">
                                <div className="panel-heading">Tìm kiếm</div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-3">Từ khóa</div>
                                        <div className="col-md-9 form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập mã thủ tục hoặc tên thủ tục"
                                                onChange={handleChangeSearch}
                                            />
                                        </div>
                                        <div className="col-md-3">Cơ quan</div>
                                        <div className="col-md-9 form-group">
                                            <select
                                                className="form-control"
                                                onChange={handleChangeOrganization}
                                                value={organizationId}
                                                disabled={!dataOrganizations.length}
                                            >
                                                <option value={0}>-- Chọn cơ quan --</option>
                                                {dataOrganizations.map((e, i) => (
                                                    <option key={e.id} value={e.id}>
                                                        {e.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-3">Lĩnh vực</div>
                                        <div className="col-md-9 form-group">
                                            <select
                                                className="form-control"
                                                onChange={handleChangeField}
                                                value={fieldId}
                                                disabled={!dataFields.length}
                                            >
                                                <option value={0}>-- Chọn lĩnh vực --</option>
                                                {dataFields.map((e, i) => (
                                                    <option key={e.id} value={e.id}>
                                                        {e.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* <div className="col-md-3">Mức độ</div>
                                        <div className="col-md-9 form-group">
                                            <select className="form-control" onChange={handleChangeLevel} value={level}>
                                                <option value={0}>-- Chọn mức độ --</option>
                                                {PROCEDURE_LEVELS.map((e, i) => (
                                                    <option key={e.value} value={e.value}>
                                                        {e.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

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
                                                <th>Mã TT</th>
                                                <th>Tên thủ tục</th>
                                                <th>Lĩnh vực</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.key}</td>
                                                    <td>
                                                        <Link to={`/chi-tiet-thu-tuc/${item.key}`}>{item.name}</Link>
                                                    </td>
                                                    <td>{item.field.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="text-center">
                                <Pagination
                                    totalRecords={totalRecords}
                                    perPage={Number.parseInt(queryParams.perPage)}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Procedure;
