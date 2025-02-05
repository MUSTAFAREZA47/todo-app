import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts/TodoContext'

import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
    const [todos, setTodos] = useState([])

    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
    }

    const updateTodo = (id, todo) => {
        setTodos((prev) =>
            prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)),
        )
    }

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }

    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, completed: !prevTodo.completed }
                    : prevTodo,
            ),
        )
    }

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos'))

        if (todos && todos.length > 0) {
            setTodos(todos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    return (
        <TodoProvider
            value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
        >
            <div className="bg-gradient-to-b from-[#1a1f36] to-[#3b4a68] min-h-screen py-8 px-4">
                <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-6 text-white">
                    {/* Header */}
                    <h1 className="text-3xl font-extrabold text-center mb-8 mt-2 tracking-wide">
                        Manage Your Todos
                    </h1>

                    {/* Todo Form */}
                    <div className="mb-6">
                        <TodoForm />
                    </div>

                    {/* Todo List */}
                    <div className="space-y-3">
                        {todos.length > 0 ? (
                            todos.map((todo) => (
                                <div key={todo.id} className="w-full">
                                    <TodoItem todo={todo} />
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-300 text-lg">
                                No todos yet. Start by adding one!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </TodoProvider>
    )
}

export default App
