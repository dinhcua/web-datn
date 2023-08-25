import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import File from 'components/File/Index';
import FileDetail from 'components/FileManage/FileDetail';
import FileManage from 'components/FileManage/Index';
import FileSearch from 'components/FileSearch/Index';
import Home from 'components/Home/Index';
import ProcedureDetail from 'components/Home/ProcedureDetail';
import Profile from 'components/Profile/Index';
import { GUEST_GUARD, USER_GUARD } from 'constants/guard';

const Routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home />,
    },
    {
        path: '/dang-nhap',
        exact: true,
        main: () => <Login />,
        guard: USER_GUARD,
    },
    {
        path: '/dang-ky',
        exact: true,
        main: () => <Register />,
        guard: USER_GUARD,
    },
    {
        path: '/ca-nhan',
        exact: true,
        main: () => <Profile />,
        guard: GUEST_GUARD,
    },
    {
        path: '/chi-tiet-thu-tuc/:id',
        exact: true,
        main: () => <ProcedureDetail />,
    },
    {
        path: '/nop-ho-so',
        exact: true,
        main: () => <File />,
    },
    {
        path: '/quan-ly-ho-so',
        exact: true,
        main: () => <FileManage />,
    },
    {
        path: '/chi-tiet-ho-so/:id',
        exact: true,
        main: () => <FileDetail />,
    },
    {
        path: '/tra-cuu-ho-so',
        exact: true,
        main: () => <FileSearch />,
    },
];

export default Routes;
