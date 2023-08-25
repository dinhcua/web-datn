import { LIST_MONTH, LIST_YEAR } from 'constants/date-time';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DatePickerUI from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import './DatePicker.scss';

DatePicker.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    required: PropTypes.bool,
    col: PropTypes.number,
    hiddenLabel: PropTypes.bool,
};

DatePicker.defaultProps = {
    col: 12,
};

function DatePicker({ label, name, form, required, col, hiddenLabel }) {
    const {
        control,
        formState: { errors },
    } = form;

    const isError = !!errors[name];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className={`form-group col-md-${col}`}>
                    {!hiddenLabel && (
                        <label htmlFor={name}>
                            {label} {required && <span className="text-danger">(*)</span>}
                        </label>
                    )}

                    <DatePickerUI
                        {...field}
                        renderCustomHeader={({ date, changeYear, changeMonth }) => (
                            <div
                                style={{
                                    margin: 10,
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <select
                                    className="form-control mr-1"
                                    value={date.getFullYear()}
                                    onChange={({ target: { value } }) => changeYear(value)}
                                >
                                    {LIST_YEAR.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="form-control mr-1"
                                    value={LIST_MONTH[date.getMonth()]}
                                    onChange={({ target: { value } }) => changeMonth(LIST_MONTH.indexOf(value))}
                                >
                                    {LIST_MONTH.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        selected={field.value}
                        placeholderText={label}
                    />

                    {isError && <p className="text-danger">{errors[name]?.message}</p>}
                </div>
            )}
        />
    );
}

export default DatePicker;
