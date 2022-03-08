import { Row } from "reactstrap";

function TasksGrid(props) {
    return (
        <div className="container">
            <Row>
                { props.children }
            </Row>
        </div>
    )
    

}

export default TasksGrid;