import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "./Header";
const UpdateTask = () => {
    const [task, setTask] = useState({
        name : '',
        description : '',
        amount : 0
    });
    const {taskId} = useParams();
    const [loading, setLoading] = useState(true);
    useEffect( () => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:3003/tasks/${taskId}`);
                const data = await response.json();
                setTask(data.data);
                setLoading(false)
            } catch (err) {
                console.error(err);
            }
        }
        fetchTask();
    }, [taskId])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setTask({...task, [name]:value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3003/tasks/${taskId}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({name: task.name, description: task.description, amount: task.amount})
        });
        if(response.ok) {
            await response.json();
            window.location.href = `/taskslists/${task.articleId}`;
        } else {
            console.error()
        }
    }
    if(loading){
        return <p>En chargement</p>
    }
    return (
        <div>
            <Header/>
            <main>
                <h2>Modifier la tâche : {task.name}</h2>
                <section className="udtask">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" id="name" value={task.name} onChange={handleInputChange}/>
                        <textarea name="description" id="description" value={task.description} cols="30" rows="10" onChange={handleInputChange}></textarea>
                        <input type="number" name="amount" id="amount" value={task.amount} onChange={handleInputChange}/>
                        <input type="submit" value="enregistrer"/>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default UpdateTask;