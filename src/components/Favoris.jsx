import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Weather from './Weather';
export function Favoris() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [favori,setfavori]=useState("");
   
    


    // Charger les tâches depuis le localStorage lors du montage du composant
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if(savedTodos) {
        setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Sauvegarder les tâches dans le localStorage lorsqu'elles changent
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
        setTodos([...todos, inputValue]);
        setInputValue('');
        }
    };
    const handleDelete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    function handleclick(todo){
        setfavori(todo)
    }

    return (
<div className="container d-flex justify-content-between ">
<div className="box p-3 border rounded text-center" style={{minHeight: '350px'}}>
    <h2>Liste des favoris</h2>
            <form onSubmit={handleSubmit} className="mb-3 mt-4">
            <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Ajouter une ville en favori"
                value={inputValue}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary">Ajouter</button>
            </div>
        </form>
            <h2>Vos favoris</h2>
            <ul className="list-group">
                {todos.map((todo, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center" onClick={()=>{handleclick(todo)}}>
                    {todo}
                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>Supprimer</button>
                </li>
                ))}
            </ul>

            
        </div>
        <Weather value={favori}/>
</div>
    );
}
