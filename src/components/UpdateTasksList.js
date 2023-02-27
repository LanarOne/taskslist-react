import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "./Header";

const UpdateTasksList = () => {
    const [taskslist, setTaskslist] = useState({
        title : '',
        description : ''
    })
    const {taskslistId} = useParams();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTaskslist = async () => {
            try {
                const response = await fetch(`http://localhost:3003/taskslists/${taskslistId}`);
                const data = await response.json();
                setTaskslist(data);
                setLoading(false)
            } catch (err) {
                console.error(err);
            }
        }
        fetchTaskslist();
    }, [taskslistId])
    const handleInputChange = (e) => {
        console.log(e)
        const {name, value} = e.target;
        setTaskslist({...taskslist, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3003/taskslists/${taskslistId}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({title: taskslist.title, description: taskslist.description})
        })
        if(response.ok) {
            await response.json();
            window.location.href = `/taskslists/${taskslistId}`
        } else {
            console.error();
        }
    }
    if(loading){
        return <p>En chargement</p>
    }
    return (
        <div>
            <Header/>
            <main>
                <h2>Modifier la tâche : {taskslist.title}</h2>
                <section>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" id="title" value={taskslist.title} onChange={handleInputChange}/>
                        <textarea name="description" id="description" cols="30" rows="10" value={taskslist.description} onChange={handleInputChange}></textarea>
                        <input type="submit" value="envoyer"/>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default UpdateTasksList;