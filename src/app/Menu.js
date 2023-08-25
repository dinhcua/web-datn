import { useSelector } from 'react-redux';

export const Menu = () => {
    const loggedInUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedInUser.id;

    let menu = [
        {
            label: 'Trang chủ',
            icon: 'fa fa-home',
            class: '',
            to: '/',
        },
    ];

    if (isLoggedIn) {
        menu.push(
            {
                label: 'TT. Cá nhân',
                icon: 'fa fa-user-circle-o',
                class: 'hidden-xs',
                to: '/ca-nhan',
            },
            {
                label: 'QL. Hồ sơ',
                icon: 'fa fa-vcard',
                class: 'hidden-xs',
                to: '/quan-ly-ho-so',
            }
        );
    } else {
        menu.push(
            {
                label: 'Đăng nhập',
                icon: 'fa fa-sign-in',
                class: 'hidden-xs',
                to: '/dang-nhap',
            },
            {
                label: 'Đăng ký',
                icon: 'fa fa-user-plus',
                class: 'hidden-xs',
                to: '/dang-ky',
            }
        );
    }

    // menu.push({
    //     label: 'Bộ thủ tục',
    //     icon: 'fa fa-book',
    //     class: 'hidden-xs',
    //     to: '/bo-thu-tuc',
    // });

    menu.push({
        label: 'Tra cứu hồ sơ',
        icon: '	fa fa-search',
        class: 'hidden-xs',
        to: '/tra-cuu-ho-so',
    });

    return menu;
};

export const UserMenu = () => {
    const loggedInUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedInUser.id;

    let menu = [];

    if (isLoggedIn) {
        menu.push(
            {
                label: loggedInUser.full_name,
                icon: 'fa fa-user',
                class: '',
                to: '/ca-nhan',
            },
            {
                label: 'Đăng xuất',
                icon: 'fa fa-sign-out',
                class: '',
                to: '/dang-xuat',
            }
        );
    } else {
        menu.push(
            {
                label: 'Đăng nhập',
                icon: 'fa fa-sign-in',
                class: '',
                to: '/dang-nhap',
            },
            {
                label: 'Đăng ký',
                icon: 'fa fa-user-plus',
                class: '',
                to: '/dang-ky',
            }
        );
    }

    return menu;
};

export const LeftMenu = () => {
    let menu = [
        {
            label: 'Thông tin cá nhân',
            icon: 'fa fa-user-circle-o',
            class: '',
            to: '/ca-nhan',
        },
        {
            label: 'QL. Hồ sơ đã nộp',
            icon: 'fa fa-vcard',
            class: '',
            to: '/quan-ly-ho-so',
        },
    ];

    return menu;
};
