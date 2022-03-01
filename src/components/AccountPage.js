import "./AccountPage.css";
import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import * as Constants from "../constants";

function AccountPage(props) {
    const [user, setUser] = useState(props.user);
    const [userData, setUserData] = useState(undefined);

    const databaseRef = ref(getDatabase());

    const getUserData = () => {
        get(child(databaseRef, `${Constants.USERS_ENDPOINT}${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.val());
                console.log(snapshot.val());
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getUserData();
    }, [props.user]);

    return (
        <section id="account">
            <div className="container">
                <Form>
                    <FormGroup row>
                    <Label for="userEmail" sm={2}>Email</Label>
                    <Col sm={10}>
                        <Input type="email" name="email" id="userEmail" readOnly value={userData ? userData.email: ""}/>
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="userName" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" id="userName" readOnly value={userData ? userData.name: ""}/>
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="userHighSchool" sm={2}>High School</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" id="userHighSchool" defaultValue={userData ? userData.highSchool: ""}/>
                    </Col>
                    </FormGroup>
                    
                    <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button>Submit</Button>
                    </Col>
                    </FormGroup>
                </Form>
            </div>
        </section>
    )
}

export default AccountPage;