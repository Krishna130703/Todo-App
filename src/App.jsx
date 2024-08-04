import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import TodoItem from './components/TodoItem'
import TodoForm from './components/TodoForm'

function App() {
const [todos,setTodos]=useState([])


 const addTodo =(todo)=>{
  setTodos((prev)=>[{id:Date.now(),...todo},...prev]) // to add to the prev todos array and not overwrite it
  //... is spread operator to add all the prev values similary we add oure new todo as an object
 }

 const updateTodo=(id,todo)=>{
  // search in the prev array for the same id and update
  setTodos((prev)=> prev.map((prevTodo)=> (prevTodo.id
    ===id ? todo : prevTodo)))
 }

 const deleteTodo = (id)=> {
  // now new array shall have all values except the one with the same id 
  setTodos((prev) => prev.filter((todo)=> todo.id!==id))
 }

 const toggleComplete =(id)=>{
  setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id
  ===id ?{...prevTodo,completed:!prevTodo.completed} : prevTodo ))
 }


 useEffect(()=>{
 const todos= JSON.parse(localStorage.getItem("todos"))

 if(todos && todos.length > 0){
  setTodos(todos)
 }
 },[])

// to set in local storage whenever change in todos 
useEffect(()=>{
localStorage.setItem("todos",JSON.stringify(todos))
},[todos])


  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
<div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id}
                          className='w-full'>
                           <TodoItem  todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
