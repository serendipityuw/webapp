import { useEffect } from 'react';
import { Button, Card, CardBody, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Constants from '../constants';

function SignInForm() {
    const auth = getAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (auth.currentUser && location.state) {
            navigate(location.state.from);
        } else if (auth.currentUser) {
            navigate(Constants.HOME_PATH);
        }
    });

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

    return (
        <Col md={6} sm={12}>
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
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
}

export default SignInForm;