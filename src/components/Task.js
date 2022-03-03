import {
    Card, CardText, CardBody,
    CardTitle, Button, Col, CardHeader, CardFooter, Badge
} from 'reactstrap';
import "./Task.css";

function Task(props) {
    return (
        <Col sm={12} md={6}>
            <Card className="task-card">
                <CardHeader><Badge>Category 1</Badge> <Badge>Category 2</Badge></CardHeader>
                <CardBody>
                    <CardTitle tag="h4">{props.task.name}</CardTitle>
                    <CardText><span className='fieldName'>Description: </span>{props.task.description}</CardText>
                    <CardText><span className='fieldName'>Estimated Hours: </span>{props.task.hours} Hours</CardText>
                    <Button className='claimButton'>Claim</Button>
                </CardBody>
                <CardFooter>Created By: <Badge tag="h5" className='creatorBadge'>{props.task.createdBy}</Badge></CardFooter>
            </Card>
        </Col>
    )
}

export default Task;