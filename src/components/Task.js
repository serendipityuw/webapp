import {
    Card, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';

function Task(props) {
    return (
        <div className="col-md-6 col-lg-4 d-flex">
            <Card className="task-card">
                <CardBody>
                    <div className="row">
                        <div className="col-sm card-content">
                            <CardTitle tag="h2">{props.task.name}</CardTitle>
                            <CardText>
                                {props.task.description}
                            </CardText>
                            <Button color="warning">Claim</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default Task;