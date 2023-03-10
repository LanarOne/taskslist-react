import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "./Header";
import Cookies from "js-cookie";

const TaskListDetails = () => {
    const [taskslist, setTaskslist] = useState(null);
    const {id} = useParams();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [tasklistUpdated, setTasklistUpdated] = useState('');
    const [checked, setChecked] = useState({});
    const token = Cookies.get('token');

    useEffect(() => {
        async function fetchTasksList() {
            const response = await fetch(`http://localhost:3003/taskslists/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            const data = await response.json();
            setTaskslist(data);
            const checkedState = {};
            for (const task of data.Tasks) {
                checkedState[task.id] = task.active;
            }
            setChecked(checkedState);
        }
        fetchTasksList();
    },[id, tasklistUpdated]);
    async function handleDelete (){
        const response = await fetch(`http://localhost:3003/taskslists/${id}`,{
            method : 'DELETE',
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        const data = await response.json();
        window.location.href = '/taskslists'
    }
    async function handleNewTask(e){
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3003/taskslists/${id}/tasks`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body : JSON.stringify({name, description, amount})
            })
            const data = await response.json();
            setName('');
            setDescription('')
            setAmount('');
            setTasklistUpdated(!tasklistUpdated)
        } catch (err) {
            console.error(err);
        }
    }

    async function handleDeleteTask(taskId){
        const response = await fetch(`http://localhost:3003/tasks/${taskId}`, {
            method : 'DELETE',
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        const data = await response.json();
        console.log(data);
        setTasklistUpdated(!tasklistUpdated)
    }
    async function handleToggleStatus(taskId) {
        const response = await fetch(`http://localhost:3003/tasks/${taskId}/active`, {
            method: 'PUT',
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        const data = await response.json();
        setTasklistUpdated(!tasklistUpdated);
    }
    async function redirection(taskId) {
        window.location.href = `/task/${taskId}/update`
    }

    if(!taskslist){
        return <div>chargement...</div>
    }

    return (
        <div>
            <Header/>
            <section className='mainCard'>
                <div className="cardHdr">
                    <h2>{taskslist.title}
                        <button onClick={handleDelete} className='deleteBtn'>
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                        <button><i className="fa-solid fa-pen"></i></button>
                    </h2>
                    <p>{taskslist.description}</p>
                </div>
                        <ul>
                            {taskslist.Tasks.map((task) => {
                                return  <li key={task.id}>
                                            <h3>{task.name}</h3>
                                            <p>{task.description}</p>
                                            <input type='checkbox' id={`task-${task.id}`} checked={task.active} onChange={() => handleToggleStatus(task.id)} />
                                        <div>
                                            <button className='deleteBtn' onClick={()=>{handleDeleteTask(task.id)}}><i
                                                className="fa-solid fa-trash-can"></i></button>
                                            <button className='redirectBtn' onClick={()=>{redirection(task.id)}}><i className="fa-solid fa-pen"></i></button>
                                        </div>
                                        </li>
                            })}
                        </ul>
            </section>
            <section>
                <h2>Ajouter une t??che ?? {taskslist.title}</h2>
                <article className="addTask">
                    <form onSubmit={handleNewTask}>
                        <input type="text" id="name" value={name} onChange={(e)=>{setName(e.target.value)}} required placeholder='nom de la tache'/>
                        <textarea id="description" cols="30" rows="10" value={description} onChange={(e)=>{setDescription(e.target.value)}} required placeholder='votre descrition de t??che'/>
                        <input type="number" id="amount" value={amount} onChange={(e)=>{setAmount(e.target.value)}} required placeholder='quantit?? souhait??e'/>
                        <input type="submit" value="envoyer"/>
                    </form>
                </article>
            </section>
        </div>
    );
};

export default TaskListDetails;