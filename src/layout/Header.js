import { getAuth, signOut } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import * as Constants from '../constants';
import "./Header.css"

function Header(props) {
    const auth = getAuth();
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState("");
    const [isOpen, setOpen] = useState(false);

    const database = getDatabase();

    const handleSignOut = () => {
        signOut(auth);
        navigate(Constants.HOME_PATH);
    }

    useEffect(() => {
        if (auth.currentUser) {
            getAccountType(auth.currentUser).then((val) => {
                setAccountType(val);
            });
        }
    });

    const getAccountType = (user) => {
        return get(child(ref(database), `${Constants.USERS_ENDPOINT}${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val().accountType
            }
        }).catch((error) => {
            console.error(error);
        });

        
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
                        {!auth.currentUser ? loggedOutLinks : (accountType === "Elder" ? elderLinks : studentLinks)}
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}

export default Header;