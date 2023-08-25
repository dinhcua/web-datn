import { castTimestamps } from 'helpers/CastObject';
import React from 'react';

FileProcessing.propTypes = {};

function FileProcessing(props) {
    const { loading, steps } = props;

    return (
        <div className="col-md-6 mb-3 mb-xl-0">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h4 className="mb-0">Quy trình xử lý</h4>
                </div>
                <div className="panel-body">
                    {loading && <div className="sp sp-page sp-circle"></div>}
                    {!loading && (
                        <div className="box">
                            <ul id="first-list">
                                {steps.map((step, i) => {
                                    step = castTimestamps(step);

                                    return (
                                        <li key={i}>
                                            <span></span>
                                            <div className="title">
                                                {step.step.name} #{i + 1}
                                            </div>
                                            <div className="info">{step.note}</div>
                                            <div className="name">- {step.user.full_name} -</div>
                                            <div className="time">
                                                <span>{step.cast.created_at.format('DD-MM-YY')}</span>
                                                <span>{step.cast.created_at.format('hh:mm A')}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileProcessing;
