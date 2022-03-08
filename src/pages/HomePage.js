import Intro from "../components/Intro";
import 'firebase/database';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import * as Constants from "../constants";
import TasksGrid from "../components/TasksGrid";
import { child, get, getDatabase, ref } from "firebase/database";
import Task from "../components/Task";


function HomePage() {
    const { data, tasks } = useContext(AuthContext);
    const [currentTasks, setCurrentTasks] = useState([]);

    useEffect(() => {
        if (tasks) {
            const newTasks = [];
            data.tasks.map(task_id => {
                if (tasks[task_id]) {
                    newTasks.push( <Task key={task_id} id={task_id} task={tasks[task_id]} />)
                }
            });
            setCurrentTasks(newTasks)
        }
    }, [tasks, data.tasks])


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