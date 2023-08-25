import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

Select.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    required: PropTypes.bool,
    col: PropTypes.number,
    hiddenLabel: PropTypes.bool,
    onChange: PropTypes.func,
    loading: PropTypes.bool,
};

Select.defaultProps = {
    col: 12,
};

function Select({ label, name, form, options, required, col, hiddenLabel, onChange, loading }) {
    const {
        formState: { errors },
    } = form;

    const isError = !!errors[name];

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field }) => (
                <div className={`form-group col-md-${col}`}>
                    {!hiddenLabel && (
                        <label htmlFor={name}>
                            {label} {required && <span className="text-danger">(*)</span>}
                        </label>
                    )}

                    <select
                        name={name}
                        className={`form-control ${isError && `invalid`}`}
                        {...field}
                        onChange={(e) => {
                            onChange && onChange(e.target.value);
                            field.onChange(e);
                        }}
                        disabled={loading}
                    >
                        <option>{`-- ${label} --`}</option>
                        {options.map((option, i) => (
                            <option key={i} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {isError && <p className="text-danger">{errors[name]?.message}</p>}
                </div>
            )}
        />
    );
}

export default Select;
