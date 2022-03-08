/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./AccountPage.css";
import { getDatabase, ref, set } from "firebase/database";
import { useContext, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import * as Constants from "../constants";
import CenterSpinner from "../components/CenterSpinner";
import { AuthContext } from "../context";


function AccountPage(props) {
    const { user, data } = useContext(AuthContext);
    const [userData, setUserData] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const database = getDatabase();

    const updateUserData = () => {
        console.log(userData);
        if (userData) {
            set(ref(database, Constants.USERS_ENDPOINT + user.uid), userData).finally(() => {
                setLoading(false);
            });
        }
    }
    
    const handleSubmitForm = (event) => {
        event.preventDefault();
        setLoading(true);
        const newUserData = userData;
        newUserData.highSchool = event.target["highSchool"].value;
        newUserData.hours = event.target["hours"].value;
        setUserData(newUserData);
        updateUserData();
    };

    return (loading) ? <CenterSpinner /> : (
        <section id="account">
            <div className="container">
                <Form onSubmit={handleSubmitForm}>
                    <FormGroup row>
                    <Label for="userEmail" sm={2}>Email</Label>
                    <Col sm={10}>
                        <Input type="email" name="email" id="userEmail" readOnly value={data ? data.email: ""}/>
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="userName" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" id="userName" readOnly value={data ? data.name: ""}/>
                    </Col>
                    </FormGroup>
                    
                    <FormGroup row>
                    <Label for="accountType" sm={2}>Account Type</Label>
                    <Col sm={10}>
                        <Input type="text" name="accountType" id="accountType" readOnly value={data ? data.accountType: ""}/>
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="userHighSchool" sm={2}>High School</Label>
                    <Col sm={10}>
                        <Input type="text" name="highSchool" id="userHighSchool" defaultValue={data ? data.highSchool: ""}/>
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="userHours" sm={2}>Service Hour Goal (in hours)</Label>
                    <Col sm={10}>
                        <Input type="number" name="hours" id="userHours" defaultValue={data ? data.hours: ""}/>
                    </Col>
                    </FormGroup>
                    
                    <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">Submit</Button>
                    </Col>
                    </FormGroup>
                </Form>
            </div>
        </section>
    )
}

export default AccountPage;