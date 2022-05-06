import { child, get, getDatabase, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { AuthContext } from "../context";
import './DashboardPage.css'
import * as Constants from '../constants';

function DashboardPage() {
    const { data } = useContext(AuthContext);
    const highSchool = data && data.highSchool;
    const [students, setStudents] = useState([]);

    const database = getDatabase();

    const getUsers = () => {
        return get(child(ref(database), `${Constants.USERS_ENDPOINT}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        getUsers().then( users => {
            const validStudents = []
            Object.keys(users).forEach(user_id => {
                if (users[user_id].highSchool === highSchool && 
                    users[user_id].accountType === "Student") {
                    validStudents.push(users[user_id])
                }
            });
            setStudents(validStudents);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const createRows = () => {  
        return students.map((student, index) => {
            return <tr>
                <th scope="row">
                    { index }
                </th>
                <td>
                    { student.name }
                </td>
                <td>
                    { student.email }
                </td>
                <td>
                    { student.hoursGoal || 0 }
                </td>
                <td>
                    { student.hoursCompleted || 0}
                </td>
            </tr>
        })
    }


    return (
        <Container>
            <h2>{ highSchool } Dashboard</h2>
            <Table striped>
                <thead>
                    <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Student Name
                    </th>
                    <th>
                        Student Email
                    </th>
                    <th>
                        Goal Hours
                    </th>
                    <th>
                        Completed  Hours
                    </th>
                    </tr>
                </thead>
                <tbody>
                    { createRows() }
                </tbody>
            </Table>
        </Container>
    );
}

export default DashboardPage;