import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import CenterSpinner from '../components/CenterSpinner';
import * as Constants from "../constants";

function Layout() {
    const { user, data } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (data && data.accountType === 'Faculty') {
            setLoading(false);
        }
        if (user) {
            setLoading(false);
        } else {
            setTimeout(() => {
                if (!user) {
                    navigate(Constants.SIGNIN_PATH, { state: { from: location }, replace: true });
                    setLoading(false);
                }
            }, 1000)
        }
    }, [user, location, navigate, data])

    return loading ? <CenterSpinner /> : (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;