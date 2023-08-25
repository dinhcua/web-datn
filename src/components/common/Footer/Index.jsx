import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-xs-6 text-white">Copyright 2023 © LDC | All rights reserved</div>

                    <div className="col-xs-6 text-right text-white">
                        Liên hệ: 0966944309&nbsp;|&nbsp;
                        <a href="/" target="_blank" rel="noreferrer" className="text-white">
                            Facebook
                        </a>
                        &nbsp;|&nbsp;
                        <a href="/" target="_blank" rel="noreferrer" className="text-white">
                            Điều khoản dịch vụ
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
