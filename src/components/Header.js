import React from 'react';
const logo = require('../media/notepadlogo.png');
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className='title'>
                <div>
                    <img src={logo} alt="minimalist logo of a simple notepad with lines, shades of green. generated with MidJourney"/>
                </div>
                <h1>My To Do List</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to={'/taskslists'}>Toutes mes listes</NavLink>
                    </li>
                    <li>
                        <NavLink>Inscription</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/addtaskslists'}>Nouvelle liste</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;