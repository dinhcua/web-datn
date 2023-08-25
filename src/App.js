import history from 'app/History';
import Routes from 'app/Routes';
import Footer from 'components/common/Footer/Index';
import DesktopMenu from 'components/common/Header/DesktopMenu';
import Header from 'components/common/Header/Index';
import Loading from 'components/common/Loading/Index';
import NotFound from 'components/NotFound/Index';
import { GUEST_GUARD, USER_GUARD } from 'constants/guard';
import { smoothScroll } from 'helpers/SmoothScroll';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import './App.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function App() {
    const user = useSelector((state) => state.user.current);
    const loggedIn = !!user.id;

    history.listen(() => {
        smoothScroll();
    });

    return (
        <div>
            <Loading />
            <Header />
            <DesktopMenu></DesktopMenu>

            <Switch>
                <Route path="/404" exact={true} component={NotFound} />
                {Routes.map((route, i) => {
                    return (
                        <Route
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            render={(props) => {
                                let redirect = false;
                                let to = '/';

                                if (route.guard === GUEST_GUARD && !loggedIn) {
                                    redirect = true;
                                    to = '/dang-nhap';
                                }

                                if (route.guard === USER_GUARD && loggedIn) {
                                    redirect = true;
                                    to = '/';
                                }

                                if (redirect) {
                                    return <Redirect to={to} />;
                                }

                                return route.main(props);
                            }}
                        />
                    );
                })}
                <Redirect to="/404" />
            </Switch>

            <Footer />
        </div>
    );
}

export default App;
