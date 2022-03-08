/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
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
                if (data.tasks.indexOf(task_id) === -1 && tasks[task_id].status === "Unclaimed") {
                    newTasks.push( <Task key={task_id} id={task_id} task={tasks[task_id]} />);
                }
            });
            setCards(newTasks);
        }
    }, [tasks, data]);

    return (
        <section className="tasks">
            <TasksGrid heading="Available Tasks">
                {cards}
            </TasksGrid>
        </section>
    )
}

export default TasksPage;