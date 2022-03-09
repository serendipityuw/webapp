/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Task from "../components/Task";
import "./TasksPage.css"
import TasksGrid from "../components/TasksGrid";
import { AuthContext } from "../context";

function TasksPage(props) {
    const [cards, setCards] = useState([]);
    const { tasks } = useContext(AuthContext);

    useEffect(() => {
        if (tasks) {
            const newTasks = [];            
            Object.keys(tasks).forEach(task_id => {
                if (tasks[task_id].status === "Unclaimed") {
                    newTasks.push( <Task key={task_id} id={task_id} task={tasks[task_id]} />);
                }
            });
            setCards(newTasks);
        }
    }, [tasks]);

    return (
        <section className="tasks">
            <TasksGrid heading="Available Tasks">
                {cards}
            </TasksGrid>
        </section>
    )
}

export default TasksPage;