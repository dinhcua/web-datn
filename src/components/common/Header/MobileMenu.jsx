import { Menu, UserMenu } from 'app/Menu';
import { logout } from 'components/Auth/userSlice';
import SweetAlert from 'lib/SweetAlert';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { loading } from '../Loading/loadingSlice';

MobileMenu.propTypes = {};

function MobileMenu(props) {
    const dispatch = useDispatch();

    const handleLogoutClick = async () => {
        dispatch(loading(true));
        try {
            await dispatch(logout());
        } catch (error) {
            SweetAlert.error(error.message);
        }
        dispatch(loading(false));
    };

    const MenuLink = ({ m, hideMobile }) => {
        return (
            <Route
                path={m.to}
                exact
                children={({ match }) => {
                    let active = match ? 'active' : '';
                    let hide = hideMobile ? 'visible-xs' : '';

                    let isLogout = m.to === '/dang-xuat';
                    return (
                        <li className={`${m.class} ${active} ${hide}`}>
                            {isLogout && (
                                <Link onClick={handleLogoutClick} to="">
                                    <i className={m.icon}></i>
                                    &nbsp;&nbsp; {m.label}
                                </Link>
                            )}

                            {!isLogout && (
                                <Link to={m.to}>
                                    <i className={m.icon}></i>
                                    &nbsp;&nbsp; {m.label}
                                </Link>
                            )}
                        </li>
                    );
                }}
            />
        );
    };

    return (
        <ul className="nav navbar-nav navbar-right">
            {Menu().map((m, i) => (
                <MenuLink key={i} m={m} hideMobile />
            ))}

            {UserMenu().map((m, i) => (
                <MenuLink key={i} m={m} />
            ))}
        </ul>
    );
}

export default MobileMenu;
