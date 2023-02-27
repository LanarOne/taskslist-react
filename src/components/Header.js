import React from 'react';
const logo = require('../media/notepadlogo.png');
import {NavLink, useLocation} from "react-router-dom";

const Header = () => {
    const location = useLocation();
    return (
        <header>
            <div className='title'>
                <div>
                    <img src={logo} alt="minimalist logo of a simple notepad with lines, shades of green. generated with MidJourney"/>
                </div>
                <NavLink to={'/'}>
                    <h1>My To Do List</h1>
                </NavLink>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to={'/register'}>S'inscrire</NavLink>
                    </li>
                    <li className={location.pathname === '/taskslists' ? 'active' : ''}>
                        <NavLink to={'/taskslists'}>Toutes mes listes</NavLink>
                    </li>
                    <li className={location.pathname === '/login' ? 'active' : ''}>
                        <NavLink to={'/login'}>Inscription</NavLink>
                    </li>
                    <li className={location.pathname === '/addtaskslists' ? 'active' : ''}>
                        <NavLink to={'/addtaskslists'}>Nouvelle liste</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;