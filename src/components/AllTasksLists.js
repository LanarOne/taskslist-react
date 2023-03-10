import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import Header from "./Header";
import Cookies from "js-cookie";
const AllTasksLists = () => {
    const [taskslists, setTaskslists] = useState([]);
    const token = Cookies.get('token')
    useEffect(() => {
        async function fetchTasksLists() {
            const response = await fetch('http://localhost:3003/taskslists',{
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            const data = await response.json();
            setTaskslists(data);
        }
        fetchTasksLists();
    }, []);
    if(!taskslists){
        return <p>Chargement</p>
    }
    return (
        <div>
            <Header/>
            <main>
                <h2>My lists</h2>
                <section className='mylists'>

                        {taskslists.map((taskslist) => {
                            return <article  className='listcard'>
                                      <ul>
                                        <li key={taskslist.id}>
                                                    <h3>{taskslist.title} :</h3>
                                                    <ul>
                                                        {taskslist.Tasks.map((task) => {
                                                            return <li key={task.id}>
                                                                      <h4>{task.name}</h4>
                                                                      <p>{task.description}</p>
                                                                   </li>
                                                        })}
                                                    </ul>
                                            <NavLink to={`/taskslists/${taskslist.id}`}>
                                                Voir la liste
                                            </NavLink>
                                        </li>
                                      </ul>
                                    </article>
                        })}
                </section>
            </main>
        </div>
    );
};

export default AllTasksLists;