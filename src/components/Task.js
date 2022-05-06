import { child, get, getDatabase, ref, set } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, Button, Col, CardHeader, CardFooter, Badge
} from 'reactstrap';
import * as Constants from "../constants";
import { AuthContext } from '../context';
import "./Task.css";

function Task(props) {
    const { user, data } = useContext(AuthContext);
    const [elder, setElder] = useState({});
    const database = getDatabase();

    const getElderData = (user_id) => {
        return get(child(ref(database), `${Constants.USERS_ENDPOINT}${user_id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleClaimTask = (event) => {
        const task_id = props.id;
        updateTaskStatus(task_id, "Claimed");
        claimTask(user.uid, task_id);
    }

    const updateHours = () => {
        const newData = data;
        newData.hoursCompleted = data.hoursCompleted ? parseInt(data.hoursCompleted) + 1 : props.task.hours;
        set(ref(database, Constants.USERS_ENDPOINT + user.uid), newData);
    }

    const handleCompleteTask = () => {
        updateTaskStatus(props.id, "Completed");
        updateHours()
    }

    const updateTaskStatus = (task_id, status) => {
        const taskRef = ref(database, Constants.TASKS_ENDPOINT + task_id);
        const newTask = props.task;
        newTask.status = status;
        if (status === "Claimed") {
            newTask.dateClaimed = Date.now();
        } else if (status === "Completed") {
            newTask.dateCompleted = Date.now();
        }
        set(taskRef, newTask);
    }

    const claimTask = (user_id, task_id) => {
        get(child(ref(database), Constants.USERS_ENDPOINT + user_id + "/tasks")).then(snapshot => {
            const tasks = snapshot.val() ? snapshot.val() : [];
            if (!tasks.includes(task_id)) {
                tasks.push(task_id);
                set(child(ref(database), Constants.USERS_ENDPOINT + user_id + "/tasks"), tasks);
            }
        })
    }

    useEffect(() => {
        getElderData(props.task.createdBy).then(userData => {
            setElder(userData)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.task]);

    return (
        <Col sm={12} md={6}>
            <Card className="task-card">
                <CardHeader><Badge>{props.task.category}</Badge></CardHeader>
                <CardBody>
                    <CardTitle tag="h4">{props.task.name}</CardTitle>        
                    <CardText><span className='fieldName'>Description: </span>{props.task.description}</CardText>
                    <CardText><span className='fieldName'>Estimated Hours: </span>{props.task.hours} Hours</CardText>
                    {data && 
                    props.task.status === "Claimed" && 
                    data.accountType === "Student" && 
                    elder.phoneNumber ? <CardText><span className='fieldName'>Phone Number: { elder.phoneNumber }</span></CardText> : ""}
                    {data && 
                    props.task.status === "Claimed" &&
                    data.accountType === "Student" && 
                    elder.address ? <CardText><span className='fieldName'>Address: { elder.address }</span></CardText> : ""}
                    {data && 
                    data.accountType === "Student" && 
                    props.task.status === "Unclaimed" ? <Button className='claimButton' onClick={handleClaimTask}>Claim</Button> : (data.accountType === "Student" && props.task.status === "Claimed" ? <Button className='claimButton' onClick={handleCompleteTask}>Complete</Button> : "")}
                </CardBody>
                { data.accountType === "Student" ? (<CardFooter>Created By: <Badge tag="h5" className='creatorBadge'>{ elder.name }</Badge></CardFooter>) : (<CardFooter>Task Status: <Badge tag="h5" className='creatorBadge'>{props.task.status}</Badge></CardFooter>) }
                
            </Card>
        </Col>
    )
}

export default Task;