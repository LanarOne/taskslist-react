import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import AllTasksLists from "./components/AllTasksLists";
import TaskListDetails from "./components/TaskListDetails";
import AddTaskList from "./components/AddTaskList";
import Header from "./components/Header";
import Login from "./components/Login";
import UpdateTask from "./components/UpdateTask";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/' element=<Home/>/>
            <Route path='/taskslists' element=<AllTasksLists/>/>
            <Route path='/taskslists/:id' element=<TaskListDetails/>/>
            <Route path='/addtaskslists' element=<AddTaskList/>/>
            <Route path='/login' element=<Login/>/>
            <Route path='/task/:taskId/update' element=<UpdateTask/>/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
