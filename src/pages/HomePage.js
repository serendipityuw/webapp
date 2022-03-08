import Intro from "../components/Intro";
import 'firebase/database';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import TasksGrid from "../components/TasksGrid";
import Task from "../components/Task";


function HomePage() {
    const { data, tasks } = useContext(AuthContext);
    const [currentTasks, setCurrentTasks] = useState([]);

    useEffect(() => {
        if (tasks && data && data.tasks) {
            const newTasks = [];
            data.tasks.forEach(task_id => {
                if (tasks[task_id] && tasks[task_id].status === "Claimed") {
                    newTasks.push( <Task key={task_id} id={task_id} task={tasks[task_id]} />);
                }
            });
            setCurrentTasks(newTasks);
        }
    }, [tasks, data]);


    return (
        <div>
            <Intro />
            <TasksGrid>
            <h2>My Tasks</h2>
            {currentTasks}
            </TasksGrid>
        </div>
    );
}

export default HomePage;