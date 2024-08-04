"use client";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useTodos } from "../store/todo-context";

export function TodoPage() {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const [filterType, setFilterType] = useState<string>("all");
  const [elementType, setElementType] = useState("all");

  // Function to handle filtering based on todoType
  const handleVisibleTodos = (todoType: string) => {
    setFilterType(todoType);
  };

  // Function to get the filtered todos based on filterType
  const getFilteredTodos = () => {
    switch (filterType) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "all":
      default:
        return todos.slice().reverse(); // Display in reverse order
    }
  };

  const visibleTodos = getFilteredTodos();

  return (
    <div className="mx-auto w-3/4">
      <ul className="flex justify-between my-4  *:px-4 *:rounded-md *:cursor-pointer">
        <li
          onClick={() => handleVisibleTodos("all")}
          className={`${elementType === "all" ? "bg-red-500" : "bg-gray-100"}`}
        >
          All Todos
        </li>
        <li
          onClick={() => {
            handleVisibleTodos("active"), setElementType("active");
          }}
          className={`${
            elementType === "active" ? "bg-red-500" : "bg-gray-100"
          }`}
        >
          Active Todos
        </li>
        <li
          onClick={() => {
            handleVisibleTodos("completed");
            setElementType("completed");
          }}
          className={`${
            elementType === "completed" ? "bg-red-500" : "bg-gray-100"
          }`}
        >
          Completed Todos
        </li>
      </ul>
      {visibleTodos.map((todo) => (
        <div
          key={todo.id}
          className="border-2 py-2 rounded-md my-4 px-4 border-red-500 flex justify-between items-center"
        >
          <input
            type="checkbox"
            className="px-3 h-5 w-5"
            checked={todo.completed}
            onChange={() => {
              toggleTodo(todo.id);
            }}
          />
          <h2
            className={`${
              todo.completed ? "line-through text-red-500 font-semibold" : ""
            } first-letter:uppercase`}
          >
            {todo.task}
          </h2>
          <MdDelete
            className="text-3xl text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      ))}
    </div>
  );
}
