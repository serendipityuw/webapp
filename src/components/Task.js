import { getAuth } from 'firebase/auth';
import { child, get, getDatabase, ref, set } from 'firebase/database';
import {
    Card, CardText, CardBody,
    CardTitle, Button, Col, CardHeader, CardFooter, Badge
} from 'reactstrap';
import * as Constants from "../constants";
import "./Task.css";

function Task(props) {
    const auth = getAuth();
    const database = getDatabase();

    const handleClaimTask = (event) => {
        const user_id = auth.currentUser.uid;
        const task_id = props.id;

        updateTaskStatus(task_id, "Claimed");
        claimTask(user_id, task_id);
    }

    const handleCompleteTask = (event) => {
        updateTaskStatus(props.id, "Completed");
    }

    const updateTaskStatus = (task_id, status) => {
        const taskRef = ref(database, Constants.TASKS_ENDPOINT + task_id);
        const newTask = props.task;
        newTask.status = status;
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

    return (
        <Col sm={12} md={6}>
            <Card className="task-card">
                <CardHeader><Badge>{props.task.category}</Badge></CardHeader>
                <CardBody>
                    <CardTitle tag="h4">{props.task.name}</CardTitle>
                    <CardText><span className='fieldName'>Date Created: </span>{new Date(props.task.timestamp).toLocaleString()}</CardText>
                    <CardText><span className='fieldName'>Description: </span>{props.task.description}</CardText>
                    <CardText><span className='fieldName'>Estimated Hours: </span>{props.task.hours} Hours</CardText>
                    {props.task.status === "Unclaimed" ? <Button className='claimButton' onClick={handleClaimTask}>Claim</Button> : (props.task.status === "Claimed" ? <Button className='claimButton' onClick={handleCompleteTask}>Complete</Button> : "")}
                </CardBody>
                <CardFooter>Created By: <Badge tag="h5" className='creatorBadge'>{props.task.createdBy}</Badge></CardFooter>
            </Card>
        </Col>
    )
}

export default Task;