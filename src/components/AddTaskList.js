import React, {useState} from 'react';
import Header from "./Header";

const AddTaskList = () => {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3003/taskslists',{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description})
    });
    if(response.ok){
        const data = await response.json();
        window.location.href = '/taskslists'
    }else{
        console.error('une erreur s\'est glissée');
    }
}
    return (
        <div>
            <Header/>
            <section className='addList'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title of the new list</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="description">Description of my list</label>
                        <textarea
                            name="description"
                            id="description"
                            cols="30"
                            rows="10"
                            value={description}
                            onChange={(e)=>setDesc(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <div>
                        <input type="submit" value="submit"/>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddTaskList;