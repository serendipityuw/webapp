import { Button, Card, CardBody, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import * as Constants from '../constants';

function SignUpForm() {
    const auth = getAuth();
    const navigate = useNavigate();

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
    
    return (
        <Col md={6} sm={12}>
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
                        <FormGroup>
                            <Label for="accountType">Account Type</Label>
                            <Input type="select" name="accountType" id="accountType">
                                <option>Student</option>
                                <option>Elder</option>
                                <option>Faculty</option>
                            </Input>
                        </FormGroup>
                        <Button type="submit" className="mr-2" color="primary">Create Account</Button>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
}

export default SignUpForm;