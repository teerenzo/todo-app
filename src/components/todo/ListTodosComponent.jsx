import { useEffect, useState } from "react"
import { retrieveAllTodosByUser } from "./api/TodoApiService"
import { deleteTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

function ListTodosComponent() {

    const today = new Date()
    const useContext= useAuth()

    const navigate = useNavigate()

    const username = useContext.username;
    
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())
    const [todos, setTodos] = useState([])
    const [message,setMessage] = useState(null)
    useEffect(() => {
        refreshTodos()
    }, [])

  function refreshTodos() {
                retrieveAllTodosByUser(username)
                .then( (response) => setTodos(response.data) )
                .catch ( (error) => console.log(error) )
                .finally ( () => console.log('cleanup') )

  }

  function deleteTodo(id) {
    console.log('clicked ' + id)
    deleteTodoApi(username, id)
    .then(

        () => {
            setMessage(`Delete of todo with id = ${id} successful`)
            refreshTodos()
        }
    )
    .catch(error => console.log(error))
}

function updateTodo(id) {
    console.log('clicked ' + id)
    navigate(`/todo/${id}`)
}

function addNewTodo() {
    navigate(`/todo/new`)
}

    return (
        <div className="container">
              <h1>Things You Want To Do!</h1>
            
            {message && <div className="alert alert-success">{message}</div>}

            <div>
                <table className="table">
                    <thead>
                            <tr>
                                <td>ID</td>
                                <td>Description</td>
                                <td>Is Done?</td>
                                <td>Target Date</td>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    {/* <td>{todo.targetDate.toDateString()}</td> */}
                                    <td>{todo.targetDate.toString()}</td>
                                    <td> <button className="btn btn-warning" 
                                                    onClick={() => deleteTodo(todo.id)}>Delete</button> 
                                                     <button className="btn btn-success" 
                                                    onClick={() => updateTodo(todo.id)}>Update</button> 
                                                    </td>
                                                     
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}

export default ListTodosComponent