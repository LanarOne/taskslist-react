import React, {useState} from 'react';
import Header from "./Header";

const AddUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        if(password === confirm){
            const response = await fetch('http://localhost:3003/users', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({email, password})
            }); if (response.ok) {
                const data = await response.json();
                window.location.href = '/'
            }
        } else {
            alert('le mot de passe ne correspond pas à la confirmation!')
        }
    }

    return (
        <div>
            <Header/>
            <h2>S'inscrire</h2>
            <main>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">e-mail:</label>
                        <input type="text" name="email" id="email" placeholder='Entrez votre adress e-mail' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="password">choisissez un mot de passe</label>
                        <input type="password" name="password" id="password" placeholder='mot de passe' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="confirm">veuillez confirmer votre mot de passe</label>
                        <input type="password" name="confirm" id="confirm" value={confirm} onChange={(e)=>{setConfirm(e.target.value)}} placeholder='confirmez'/>
                    </div>
                    <input type="submit" value="Envoyer"/>
                </form>
            </main>
        </div>
    );
};

export default AddUser;