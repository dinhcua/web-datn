import React from 'react';
import PropTypes from 'prop-types';

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    required: PropTypes.bool,
    col: PropTypes.number,
    hiddenLabel: PropTypes.bool,
};

InputField.defaultProps = {
    col: 12,
};

function InputField({ label, name, form, required, col, hiddenLabel }) {
    const {
        register,
        formState: { errors },
    } = form;

    const isError = !!errors[name];

    return (
        <div className={`form-group col-md-${col}`}>
            {!hiddenLabel && (
                <label htmlFor={name}>
                    {label} {required && <span className="text-danger">(*)</span>}
                </label>
            )}
            <input type="text" className={`form-control ${isError && `invalid`}`} {...register(name)} placeholder={label} />
            {isError && <p className="text-danger">{errors[name]?.message}</p>}
        </div>
    );
}

export default InputField;
