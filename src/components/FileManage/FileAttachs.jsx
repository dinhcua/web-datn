import React from 'react';

FileAttachs.propTypes = {};

function FileAttachs(props) {
    const { loading, files } = props;

    return (
        <div className="col-md-12 mb-3 mb-xl-0">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h4 className="mb-0">Tệp đính kèm</h4>
                </div>
                <div className="panel-body">
                    {loading && <div className="sp sp-page sp-circle"></div>}
                    {!loading && (
                        <table className="table table-bordered">
                            <tbody>
                                {files.map((file, i) => (
                                    <tr key={i}>
                                        <td style={{ width: '70%' }}>{file.title}</td>
                                        <td>
                                            <a
                                                href={`${process.env.REACT_APP_ROOT_STORAGE}${file.path}`}
                                                type="button"
                                                className="btn btn-sm btn-success"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i className="fa fa-download"></i>
                                            </a>

                                            {(file.path.endsWith('.doc') || file.path.endsWith('.docx')) && (
                                                <>
                                                    <a
                                                        href={`https://docs.google.com/gview?url=${process.env.REACT_APP_ROOT_STORAGE}${file.path}&embedded=true`}
                                                        role="button"
                                                        className="btn btn-sm btn-icon btn-info ml-3"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <i className="fa fa-eye"></i>
                                                    </a>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileAttachs;
