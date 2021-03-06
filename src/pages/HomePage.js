import Intro from "../components/Intro";
import 'firebase/database';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import TasksGrid from "../components/TasksGrid";
import Task from "../components/Task";
import * as Constants from "../constants";
import { Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";


function HomePage() {
    const { data, tasks } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentTasks, setCurrentTasks] = useState([]);

    useEffect(() => {
        if (data && data.accountType === "Faculty") {
            navigate(Constants.DASHBOARD_PATH)
        }
        if (tasks && data && data.tasks) {
            const newTasks = [];
            const { accountType } = data;
            data.tasks.forEach(task_id => {
                if (accountType === "Student") {
                    if (tasks[task_id] && tasks[task_id].status === "Claimed") {
                        newTasks.push( <Task key={task_id} id={task_id} task={tasks[task_id]} />);
                    }
                } else if (accountType === "Elder") {
                    if (tasks[task_id]) {
                        newTasks.push( <Task key={task_id} id={task_id} task={tasks[task_id]} />);
                    }
                }
                
            });
            setCurrentTasks(newTasks);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks, data]);


    return (
        <div>
            <Intro />
            <TasksGrid heading="My Tasks">
            {currentTasks.length === 0 ? <Alert color="primary">You don't have any claimed tasks. Claim a task from <a href="/tasks">Tasks</a> page</Alert> : currentTasks}
            </TasksGrid>
        </div>
    );
}

export default HomePage;