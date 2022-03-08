import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import CenterSpinner from '../components/CenterSpinner';
import * as Constants from "../constants";

function Layout() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            setLoading(false);
        } else {
            setTimeout(() => {
                if (!user) {
                    navigate(Constants.SIGNIN_PATH, { state: { from: location }, replace: true });
                    setLoading(false);
                }
            }, 500)
        }
    }, [user, location, navigate])

    return loading ? <CenterSpinner /> : (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;