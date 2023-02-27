import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import Header from "./Header";
const AllTasksLists = () => {
    const [taskslists, setTaskslists] = useState([]);
    useEffect(() => {
        async function fetchTasksLists() {
            const response = await fetch('http://localhost:3003/taskslists');
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
                                                    <h3>{taskslist.title}</h3>
                                                    <p>{taskslist.description}</p>
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
                <NavLink to={'/addtaskslists'}>
                    New List
                </NavLink>
            </main>
        </div>
    );
};

export default AllTasksLists;