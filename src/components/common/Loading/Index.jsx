import React from 'react';
import { useSelector } from 'react-redux';
import './Index.scss';

Loading.propTypes = {};

function Loading(props) {
    const loading = useSelector((state) => state.loading);

    return loading ? (
        <div className="progress-bg">
            <div className="progress-spinner">
                <div className="sp sp-circle"></div>
            </div>
        </div>
    ) : (
        <></>
    );
}

export default Loading;
