import React from 'react';
import { Menu } from 'app/Menu';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

DesktopMenu.propTypes = {};

function DesktopMenu(props) {
    const MenuLink = ({ m }) => {
        return (
            <Route
                path={m.to}
                exact
                children={({ match }) => {
                    let active = match ? 'active' : '';
                    return (
                        <li className={`dropdown barmenu ${active}`}>
                            <Link to={m.to}>
                                <i className={m.icon}></i>
                                {m.label}
                            </Link>
                        </li>
                    );
                }}
            />
        );
    };

    return (
        <div className="mainbar hidden-xs">
            <div className="container">
                <div className="mainbar-collapse collapse">
                    <ul className="nav navbar-nav mainbar-nav">
                        {Menu().map((m, i) => (
                            <MenuLink key={i} m={m} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DesktopMenu;
