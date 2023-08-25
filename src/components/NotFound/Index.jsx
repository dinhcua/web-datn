import React from 'react';
import { Link } from 'react-router-dom';

NotFound.propTypes = {};

function NotFound(props) {
    return (
        <div className="container">
            <div className="content text-center">
                <div className="content-container">
                    <div className="content-header">
                        <h2 className="content-header-title">TRANG KHÔNG TỒN TẠI</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h3>404 Not Found</h3>
                            <h4>
                                Trang hiện tại không còn tồn tại do đường link hỏng hoặc đã bị xóa bởi quản trị viên. Bạn có thể quay lại trang chủ
                                tại đây:
                            </h4>

                            <Link role="button" className="btn btn-primary mt-3" to="/">
                                Trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
