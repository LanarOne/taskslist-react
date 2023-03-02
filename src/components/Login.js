import React, {useState} from 'react';
import Header from "./Header";
import Cookies from "js-cookie";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3003/login', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({email, password})
            });
            if(response.ok) {
                const data = await response.json();
                Cookies.set('token', data.token)
                console.log(data)
                window.location.href = '/'
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <Header/>
            <main>
                <h2>S'identifier</h2>
                <section>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="">Votre e-mail</label>
                            <input type="email" name="email" id="email" required placeholder='entrez votre email' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                        </div>
                        <div>
                            <label htmlFor="">Entrez votre mot de passe</label>
                            <input type="password" name="password" id="password"  onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                        </div>
                        <input type="submit" value="se connecter"/>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Login;