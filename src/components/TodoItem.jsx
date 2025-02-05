import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext.jsx'

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    return (
        <div
            className={`flex items-center w-full p-3 gap-x-3 border rounded-lg shadow-md transition-colors duration-300 ${
                todo.completed
                    ? 'bg-green-100 border-green-300'
                    : 'bg-purple-100 border-purple-300'
            }`}
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                className="cursor-pointer w-5 h-5 accent-green-500"
                checked={todo.completed}
                onChange={toggleCompleted}
            />

            {/* Todo Message */}
            <input
                type="text"
                className={`flex-grow text-sm font-medium px-2 py-1 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                    todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                } ${isTodoEditable ? 'border border-gray-300' : ''}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit/Save Button */}
            <button
                className={`w-8 h-8 flex justify-center items-center rounded-md border text-gray-700 transition duration-200 hover:bg-gray-100 ${
                    todo.completed ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => {
                    if (todo.completed) return
                    if (isTodoEditable) {
                        editTodo()
                    } else {
                        setIsTodoEditable((prev) => !prev)
                    }
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? '💾' : '✏️'}
            </button>

            {/* Delete Button */}
            <button
                className="w-8 h-8 flex justify-center items-center rounded-md border border-red-300 text-red-500 hover:bg-red-100 transition duration-200"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    )
}

export default TodoItem
