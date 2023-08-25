import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Template.propTypes = {
    templates: PropTypes.array.isRequired,
    onChangeValue: PropTypes.func.isRequired,
};

function Template({ templates, onChangeValue }) {
    const [data, setData] = useState(templates);

    const changeFieldValue = (index, value) => {
        let newArr = [...data];

        newArr[index].value = value;
        setData(newArr);
    };

    useEffect(() => {
        onChangeValue(data);
    }, [data]);

    const renderComponent = (index, field) => {
        switch (field.type) {
            case 'text':
                return (
                    <input type="text" className="form-control" placeholder={field.label} onChange={(e) => changeFieldValue(index, e.target.value)} />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        className="form-control"
                        placeholder={field.label}
                        onChange={(e) => changeFieldValue(index, e.target.value)}
                    />
                );
            case 'textbox':
                return (
                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder={field.label}
                        onChange={(e) => changeFieldValue(index, e.target.value)}
                    ></textarea>
                );
            case 'select':
                return (
                    <select className="form-control" onChange={(e) => changeFieldValue(index, e.target.value)}>
                        <option value="">-- {field.label} --</option>
                        {field.options.map((e, i) => (
                            <option key={i} value={e.value}>
                                {e.label}
                            </option>
                        ))}
                    </select>
                );
        }
    };

    return (
        <div>
            {templates.map((e, i) => (
                <div key={i} className="form-group">
                    <label>{e.label}</label>
                    {renderComponent(i, e)}
                </div>
            ))}
        </div>
    );
}

export default Template;
