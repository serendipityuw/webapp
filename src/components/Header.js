import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "reactstrap";
import * as Constants from '../constants';
// import logo from "../img/icon.png";

function Header(props) {
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth);
        navigate(Constants.HOME_PATH);
    }

    const loggedInLinks = (
        <div className="d-flex align-content-center flex-wrap justiy-content-end nav-links">
            <a className="nav-link" href={Constants.HOME_PATH}>Home</a>
            <a className="nav-link" href={Constants.TASKS_PATH}>Tasks</a>
            <a className="nav-link" href={Constants.HISTORY_PATH}>History</a>
            <a className="nav-link" href={Constants.ACCOUNT_PATH}>Account</a>
            <a className="nav-link" onClick={handleSignOut} href={Constants.HOME_PATH} >Sign Out</a>
        </div>
    );

    return (
        <header>
            <Navbar>
                <div className="container">
                    <div className="d-flex flex-row align-items-center justify-content-start">
                        <Link to={Constants.HOME_PATH} className="home">{Constants.APP_NAME}</Link>
                    </div>
                    {(auth.currentUser) ? loggedInLinks : null}
                </div>
            </Navbar>
        </header>
    );
}

export default Header;