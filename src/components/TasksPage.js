/* eslint-disable react-hooks/exhaustive-deps */
import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import * as Constants from "../constants";
import CenterSpinner from "./CenterSpinner";
import Task from "./Task";
import "./TasksPage.css"

function TasksPage(props) {
    const [loading, setLoading] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [cards, setCards] = useState([]);
    const database = getDatabase();

    useEffect(() => {
        console.log(props.user)
        getTasks();
    }, [props.user]);

    useEffect(() => {
        if (tasks) {
            createCards(tasks);
        }
    }, [tasks])

    const getTasks = () => {
        setLoading(true);
        get(child(ref(database), Constants.TASKS_ENDPOINT)).then((snapshot) => {
            if (snapshot.exists()) {
                setTasks(snapshot.val());
            }
        }).catch(error => {
            console.error(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    const createCards = (tasks) => {
        const newCards = [];
        for (const task_id in tasks) {
            newCards.push( <Task key={task_id} id={task_id} task={tasks[task_id]} />)
        }
        setCards(newCards);
    };

    return (loading) ? <CenterSpinner /> : (
        <section id="tasks">
            <div className="container">
                <Row>
                    {cards}
                </Row>
            </div>
        </section>
    )
}

export default TasksPage;