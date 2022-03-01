import { useEffect, useState } from 'react';
import { Button, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { browserLocalPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Constants from '../constants';

function SignInForm() {
    const [createAccount, setCreateAccount] = useState(false);

    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (auth.currentUser) {
            navigate(location.state.from);
        }
    });
    
    const toggleCreateAcount = (event) => {
        event.preventDefault();
        setCreateAccount(!createAccount);
    }

    const handleCreateAccount = (event) => {
        event.preventDefault();
        const email = event.target["email"].value;
        const pass = event.target["password"].value;
        const confirmPass = event.target["confirmPassword"].value;
        console.log(email, pass, confirmPass)
        if (pass !== confirmPass) {

        } else {
            createUserWithEmailAndPassword(auth, email, pass).then(credentials => {
                let user = credentials.user;
                console.log(user);
                navigate(Constants.HOME_PATH);
            })
            .catch(error => {
                console.log(error.message);
            });
        }   
    }

    const handleSignIn = (event) => {
        event.preventDefault();
        const email = event.target["email"].value;
        const pass = event.target["password"].value;
        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithEmailAndPassword(auth, email, pass).then(credentials => {
                let user = credentials.user;
                console.log(user);
                navigate(Constants.HOME_PATH);
            });
        }).catch(error => {
            console.log(error.message);
        });
        
       
    }

    if (createAccount) {
        return (
            <Card className="loginCard">
                <CardBody>
                    <Form onSubmit={handleCreateAccount}>
                        <FormGroup>
                            <Label for="emailInput">Email</Label>
                            <Input required type="email" name="email" id="emailInput" placeholder="saatvik@gmail.com" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="passwordInput">Password</Label>
                            <Input required type="password" name="password" id="passwordInput" placeholder="super secret password" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPasswordInput">Confirm Password</Label>
                            <Input required type="password" name="confirmPassword" id="confirmPasswordInput" placeholder="super secret password" />
                        </FormGroup>
                        <Button type="submit" className="mr-2" color="primary">Create Account</Button>
                        <Button type="button" outline color="primary" onClick={toggleCreateAcount}>Sign In</Button>
                    </Form>
                </CardBody>
            </Card>
        );
    }
    return (
        <Card className="loginCard">
            <CardBody>
                <Form onSubmit={handleSignIn}>
                    <FormGroup>
                        <Label for="emailInput">Email</Label>
                        <Input required type="email" name="email" id="emailInput" placeholder="saatvik@gmail.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordInput">Password</Label>
                        <Input required type="password" name="password" id="passwordInput" placeholder="super secret password" />
                    </FormGroup>
                    <Button type="submit" className="mr-2" color="primary">Sign In</Button>
                    <Button type="button" outline color="primary" onClick={toggleCreateAcount}>Create Account</Button>
                </Form>
            </CardBody>
        </Card>
    );
}

export default SignInForm;