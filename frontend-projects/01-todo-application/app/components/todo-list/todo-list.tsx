"use client";
import { useTodo } from "@/app/provider/todo-provider";
import { useState } from "react";

export default function TodoList() {
  const [editTodo, setEditTodo] = useState("");
  const { renderTodo, toggleTodo, deleteTodo, handleEditedTodos } = useTodo();
  return (
    <section className="w-1/2 mx-auto">
      {renderTodo.map((todo) => (
        <div
          className="flex text-lg  my-2 justify-between items-center  bg-gray-100 px-2
        rounded-md py-2 border "
          key={todo.id}
        >
          <input
            type="checkbox"
            className="w-6 h-6 text-gray-600 bg-gray-100 border-gray-300 rounded  focus:ring-0"
            checked={todo.status === "completed"}
            onChange={() => toggleTodo(todo.id)}
          />
          <input
            className="font-semibold text-gray-700 outline-none bg-gray-100"
            type="text"
            defaultValue={todo.task}
            value={todo.task}
            onChange={(e) =>
              handleEditedTodos({ id: todo.id, task: e.target.value })
            }
          />
          <button
            onClick={() => deleteTodo(todo.id)}
            className="bg-pink-600 rounded-sm px-6 py-2 text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}
