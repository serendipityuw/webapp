import { getAuth, signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import * as Constants from '../constants';
import { AuthContext } from "../context";
import "./Header.css"

function Header() {
    const { data } = useContext(AuthContext);
    const auth = getAuth();
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);

    const handleSignOut = () => {
        signOut(auth);
        navigate(Constants.HOME_PATH);
    }

    const studentLinks = (
        <>
            <NavItem>
                <NavLink href={Constants.HOME_PATH}>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={Constants.TASKS_PATH}>Tasks</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={Constants.HISTORY_PATH}>History</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={Constants.ACCOUNT_PATH}>Account</NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={handleSignOut} href={Constants.HOME_PATH}>Sign Out</NavLink>
            </NavItem>
        </>
    );

    const elderLinks = (
        <>
            <NavItem>
                <NavLink href={Constants.HOME_PATH}>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={Constants.ADD_TASK_PATH}>Add Task</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={Constants.HISTORY_PATH}>History</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={Constants.ACCOUNT_PATH}>Account</NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={handleSignOut} href={Constants.HOME_PATH}>Sign Out</NavLink>
            </NavItem>
        </>
    );

    const loggedOutLinks = (
        <>
            <NavItem>
                <NavLink href={Constants.SIGNIN_PATH}>Sign In</NavLink>
            </NavItem>
        </>
    );

    const toggle = () => {
        setOpen(!isOpen);
    }

    return (
        <header>
            <Navbar container color="dark" dark expand="sm">
                <NavbarBrand className="home-link" href={Constants.HOME_PATH}>{Constants.APP_NAME}</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        {!data ? loggedOutLinks : (data.accountType === "Elder") ? elderLinks : studentLinks}
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}

export default Header;