import React from 'react';
import PropTypes from 'prop-types';

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    col: PropTypes.number,
    checked: PropTypes.bool,
};

Checkbox.defaultProps = {
    col: 12,
};

function Checkbox({ label, name, form, checked, col }) {
    const { register } = form;

    return (
        <div className={`form-group col-md-${col}`}>
            <div className="checkbox">
                <label>
                    <input type="checkbox" style={{ float: 'none' }} {...register(name)} checked={checked} />
                    &nbsp;{label}
                </label>
            </div>
        </div>
    );
}

export default Checkbox;
