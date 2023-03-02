import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Cookies from 'js-cookie';
const Test = () => {

    const token = Cookies.get('token');
    console.log(token)
    const [jsonResponse, setJsonResponse] = useState('')
    useEffect( () => {
        async function fetchTest() {
            try {
                const promise = await fetch('http://localhost:3003/test', {
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                });
                const data = await promise.json();
                setJsonResponse(data)
            } catch (err) {
                console.error(err);
                setJsonResponse('erreur maggle')
            }
        }
        fetchTest();
    })

    return (
        <div>
            <Header/>
            <p>{jsonResponse}</p>
        </div>
    );
};

export default Test;