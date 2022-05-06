import { Button, Card, CardBody, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import * as Constants from '../constants';
import { getDatabase, ref, set } from 'firebase/database';
import { useState } from 'react';
import CenterSpinner from './CenterSpinner';

function SignUpForm() {
    const auth = getAuth();
    const navigate = useNavigate();
    const database = getDatabase();
    const [loading, setLoading] = useState(false);

    const setUserData = (form, user) => {
        const userData = {};
        userData.name = form["name"].value;
        userData.email = form["email"].value;
        userData.accountType = form["accountType"].value;
        if (userData.accountType !== "Elder") {
            userData.highSchool = form["highSchool"].value;
        }
        if (userData.accountType !== "Student") {
            userData.hoursCompleted =  0;
        }

        set(ref(database, Constants.USERS_ENDPOINT + user.uid), userData).then(updateProfile(user, {displayName: userData.name})).finally
        (setLoading(false));
    }

    const handleCreateAccount = (event) => {
        event.preventDefault();
        setLoading(true);
        const email = event.target["email"].value;
        const pass = event.target["password"].value;
        const confirmPass = event.target["confirmPassword"].value;
        console.log(email, pass, confirmPass)
        if (pass !== confirmPass) {

        } else {
            createUserWithEmailAndPassword(auth, email, pass).then(credentials => {
                let user = credentials.user;
                setUserData(event.target, user);
                console.log(user);
                navigate(Constants.HOME_PATH);
            })
            .catch(error => {
                console.log(error.message);
            });
        }   
    }

    const accountOptions = () => {
        return Constants.ACCOUNT_TYPES.map((accountType) => {
            return <option>{accountType}</option>
        })
    }
    
    return loading ? <CenterSpinner /> : (
        <Col md={6} sm={12}>
            <Card className="loginCard">
                <CardBody>
                    <Form onSubmit={handleCreateAccount}>
                        <FormGroup>
                            <Label for="nameInput">Name</Label>
                            <Input required type="text" name="name" id="nameInput" placeholder="Saatvik" />
                        </FormGroup>
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
                                {accountOptions()}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="highSchool">High School (for students/faculty only)</Label>
                            <Input type="text" name="highSchool" id="highSchool" placeholder="High School" />
                        </FormGroup>
                        <Button type="submit" className="mr-2" color="primary">Create Account</Button>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
}

export default SignUpForm;