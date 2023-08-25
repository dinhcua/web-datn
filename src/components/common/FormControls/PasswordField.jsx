import React, { useState } from 'react';
import PropTypes from 'prop-types';

PasswordField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    required: PropTypes.bool,
    col: PropTypes.number,
    hiddenLabel: PropTypes.bool,
};

PasswordField.defaultProps = {
    col: 12,
};

function PasswordField({ label, name, form, required, col, hiddenLabel }) {
    const {
        register,
        formState: { errors },
    } = form;

    const isError = !!errors[name];

    const [showPass, setShowPass] = useState(false);

    return (
        <div className={`form-group col-md-${col}`}>
            {!hiddenLabel && (
                <label htmlFor={name}>
                    {label} {required && <span className="text-danger">(*)</span>}
                </label>
            )}
            <div className="input-group">
                <input type={showPass ? `text` : `password`} className={`form-control ${isError && `invalid`}`} {...register(name)} placeholder={label} />
                <div className="input-group-btn">
                    <button type="button" className="btn btn-default" onClick={() => setShowPass(!showPass)}>
                        <span className={showPass ? `fa fa-eye` : `fa fa-eye-slash`}></span>
                    </button>
                </div>
            </div>

            {isError && <p className="text-danger">{errors[name]?.message}</p>}
        </div>
    );
}

export default PasswordField;
