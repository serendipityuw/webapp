import {
    Card, CardText, CardBody,
    CardTitle, Button, Col
} from 'reactstrap';
import "./Task.css";

function Task(props) {
    return (
        <Col sm={12} md={6}>
            <Card className="task-card">
                <CardBody>
                    <div className="row">
                        <div className="col-sm card-content">
                            <CardTitle tag="h2">{props.task.name}</CardTitle>
                            <CardText>
                                {props.task.description}
                                <br/>
                                Task Hours: {props.task.hours}
                            </CardText>
                            <Button color="warning">Claim</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default Task;