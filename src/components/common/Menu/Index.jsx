import { LeftMenu } from 'app/Menu';
import React from 'react';
import { NavLink } from 'react-router-dom';

Menu.propTypes = {};

function Menu(props) {
    return (
        <div className="list-group">
            {LeftMenu().map((m, i) => (
                <NavLink key={i} to={m.to} className={`list-group-item ${m.class}`} exact>
                    <i className={m.icon}></i>
                    &nbsp;&nbsp; {m.label}
                    <i className="fa fa-chevron-right list-group-chevron"></i>
                </NavLink>
            ))}
        </div>
    );
}

export default Menu;
