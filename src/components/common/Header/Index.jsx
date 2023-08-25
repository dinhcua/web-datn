import React from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import './Index.scss';

Header.propTypes = {};

function Header(props) {
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <i className="fa fa-bars"></i>
                    </button>
                    <Link className="navbar-brand navbar-brand-image" to="/">
                        <div className="hidden-xs">
                            <img src="/assets/images/logo.png" alt="Logo" />
                        </div>
                        <div className="visible-xs">
                            <img src="/assets/images/logo.png" alt="Logo" />
                        </div>
                    </Link>
                </div>
                <div className="navbar-collapse collapse">
                    <MobileMenu></MobileMenu>
                </div>
            </div>
        </div>
    );
}

export default Header;
