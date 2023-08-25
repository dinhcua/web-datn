import OrganizationsApi from 'api/OrganizationsApi';
import React, { useEffect, useState } from 'react';
import TreeView from '../@extensions/TreeView';

OrganizationsMenu.propTypes = {};

function OrganizationsMenu(props) {
    const [groupFields, setGroupFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setOrganizationId, setFieldId } = props;

    useEffect(() => {
        getAllGroupFields();
    }, []);
    const handleChangeOrganization = (id) => {
        setOrganizationId(Number.parseInt(id));
    };
    const handleChangeField = (organId, fieldId) => {
        setOrganizationId(organId);
        setFieldId(Number.parseInt(fieldId));
    };

    const getAllGroupFields = async () => {
        try {
            setLoading(true);
            const { data } = await OrganizationsApi.getGroupFields();

            let dt = data.map((organ) => {
                return {
                    id: organ.key,
                    title: organ.name,
                    count: organ.fields.reduce((c, v) => {
                        return c + v.count_procedures;
                    }, 0),
                    // url: `?organization=${organ.id}`,
                    action: () => handleChangeOrganization(organ.id),
                    childrens: organ.fields.map((field) => {
                        return {
                            id: field.key,
                            title: field.name,
                            count: field.count_procedures,
                            url: `?organization=${organ.key}&field=${field.key}`,
                            action: () => handleChangeField(organ.id, field.id),
                        };
                    }),
                };
            });

            setGroupFields(dt);
            setLoading(false);
        } catch (error) {}
    };

    return (
        <div className="panel panel-default panel-primary">
            <div className="panel-heading text-center">
                <h4>CƠ QUAN THỰC HIỆN</h4>
            </div>
            <div className="panel-body">
                {loading && <div className="sp sp-page sp-circle"></div>}
                {!loading && <TreeView data={groupFields} title="Cơ quan thực hiện" />}
            </div>
        </div>
    );
}

export default OrganizationsMenu;
