/* eslint-disable react-hooks/exhaustive-deps */
import { child, get, getDatabase, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { Row } from "reactstrap";
import * as Constants from "../constants";
import Task from "../components/Task";
import "./TasksPage.css"
import TasksGrid from "../components/TasksGrid";
import { AuthContext } from "../context";

function TasksPage(props) {
    const [cards, setCards] = useState([]);
    const { data, tasks } = useContext(AuthContext);

    useEffect(() => {
        if (tasks && data && data.tasks) {
            const newTasks = [];
            
            Object.keys(tasks).forEach(task_id => {
                if (data.tasks.indexOf(task_id) === -1) {
                    newTasks.push( <Task key={task_id} id={task_id} task={tasks[task_id]} />);
                }
            });
            setCards(newTasks);
        }
    }, [tasks, data]);

    return (
        <section className="tasks">
            <TasksGrid>
                {cards}
            </TasksGrid>
        </section>
    )
}

export default TasksPage;