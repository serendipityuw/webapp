import { Link } from "react-router-dom";
import { Navbar } from "reactstrap";
import * as Constants from '../constants';
// import logo from "../img/icon.png";

function Header(props) {
    const loggedInLinks = (
        <div className="d-flex align-content-center flex-wrap justiy-content-end nav-links">
            <a className="nav-link" href="/home">Home</a>
            <a className="nav-link" href="/tasks">Tasks</a>
            <a className="nav-link" href="/history">History</a>
            <a className="nav-link" href="/history">Account</a>
            <a className="nav-link" onClick={props.handleSignOut} href="/" >Sign Out</a>
        </div>
    );

    return (
        <header>
            <Navbar>
                <div className="container">
                    <div className="d-flex flex-row align-items-center justify-content-start">
                        <Link to="/home" className="home">{Constants.APP_NAME}</Link>
                    </div>
                    {(props.user) ? loggedInLinks : null}
                </div>
            </Navbar>
        </header>
    );
}

export default Header;