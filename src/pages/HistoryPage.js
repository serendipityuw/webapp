import { useContext, useEffect, useState } from "react";
import Task from "../components/Task";
import TasksGrid from "../components/TasksGrid";
import { AuthContext } from "../context";

function HistoryPage(props) {
    const { data, tasks } = useContext(AuthContext);
    const [completeTasks, setCompleteTasks] = useState([]);

    useEffect(() => {
        if (tasks && data && data.tasks) {
            const newTasks = [];
            data.tasks.forEach(task_id => {
                if (tasks[task_id] && tasks[task_id].status === "Completed") {
                    newTasks.push( <Task key={task_id} id={task_id} task={tasks[task_id]} />);
                }
            });
            setCompleteTasks(newTasks);
        }
    }, [tasks, data]);

    return (
        <div>
            <TasksGrid heading="Completed Tasks">
            {completeTasks}
            </TasksGrid>
        </div>
    )
}

export default HistoryPage;