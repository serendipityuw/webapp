import { Row } from "reactstrap";

function TasksGrid(props) {
    return (
        <div className="container my-3">
            <h2>{props.heading}</h2>
            <Row>
                { props.children }
            </Row>
        </div>
    )
    

}

export default TasksGrid;