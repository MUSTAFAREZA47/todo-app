import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext.jsx'

function TodoForm() {
    const [todo, setTodo] = useState('')
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()

        if (!todo) return

        addTodo({ todo, completed: false })
        setTodo('')
    }

    return (
        <form
            onSubmit={add}
            className="flex items-center w-full max-w-lg mx-auto shadow-md bg-white/80 rounded-lg overflow-hidden"
        >
            <input
                type="text"
                placeholder="Write your todo..."
                className="w-full px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className="px-5 py-2 bg-green-500 text-white font-semibold hover:bg-green-600 focus:bg-green-700 focus:outline-none transition duration-200"
            >
                Add
            </button>
        </form>
    )
}

export default TodoForm
