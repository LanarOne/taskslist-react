import React, {useEffect, useState} from 'react';
import Header from "./Header";

const ShowUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch('http://localhost:3003/users');
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);
    if(!users){
        return <p>chargement</p>
    }
    return (
        <div>
            <Header/>
            <main>
                <h2>My Users</h2>
                <section className="myUsers">
                    <ul>
                        {users.map((user) => {
                            return <li key={user.id}>
                                <h3>{user.email}</h3>
                                {/*<p>{user.password}</p>*/}
                            </li>
                        })}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default ShowUsers;