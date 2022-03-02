import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./AddTaskPage.css";

function AddTaskPage(props) {
    return (
        <section id="add-task">
            <div className="container">
                <Form>
                    <FormGroup>
                        <Label for="taskName">Task Name</Label>
                        <Input required type="text" name="name" id="taskName" placeholder="Pick up prescription" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="taskDescription">Task Description</Label>
                        <Input required type="textarea" name="description" id="taskDescription" placeholder="Brief description of task" />
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