import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./AddTaskPage.css";
import * as Constants from "../constants";
import CenterSpinner from "./CenterSpinner";
import { getAuth } from "firebase/auth";

function AddTaskPage(props) {
    const [loading, setLoading] = useState(false);
    const database = getDatabase();
    const auth = getAuth();
    const tasksRef = ref(database, Constants.TASKS_ENDPOINT);
    
    const handleAddTask = (event) => {
        const newTaskRef = push(tasksRef);
        event.preventDefault();
        setLoading(true);
        const newTask = {};
        newTask.name = event.target["name"].value;
        newTask.description = event.target["description"].value;
        newTask.hours = event.target["hours"].value;
        newTask.category = event.target["category"].value;
        newTask.timestamp = Date.now();
        newTask.status = "Unclaimed";
        newTask.createdBy = auth.currentUser.displayName;
        set(newTaskRef, newTask).finally(() => {
            setLoading(false);
        });
    }

    return (loading) ? <CenterSpinner /> : (
        <section id="add-task">
            <div className="container">
                <Form onSubmit={handleAddTask}>
                    <FormGroup>
                        <Label for="taskName">Task Name</Label>
                        <Input required type="text" name="name" id="taskName" placeholder="Pick up prescription" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="taskDescription">Task Description</Label>
                        <Input required type="textarea" name="description" id="taskDescription" placeholder="Brief description of task" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="categorySelect">Task Category</Label>
                        <Input type="select" name="category" id="categorySelect">
                            <option>Grocery</option>
                            <option>Medication</option>
                            <option>Companionship</option>
                            <option>Household Chore</option>
                            <option>Other</option>
                    </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="taskHours">Task Duration (in hours) </Label>
                        <Input required type="number" name="hours" id="taskDescription" placeholder="Estimated duration of task in hours" />
                    </FormGroup>

                    <Button type="submit" className="mr-2" color="primary">Submit</Button>
                </Form>
            </div>
        </section>
    )
}

export default AddTaskPage;