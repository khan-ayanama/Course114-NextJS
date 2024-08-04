"use client";
import { FormEvent, useState } from "react";
import { useTodos } from "../store/todo-context";

export default function AddTodo() {
  const [todo, setTodo] = useState<string>("");

  const { addTodo } = useTodos();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  }
  return (
    <div className="mx-auto text-center w-3/4">
      <form
        className="flex justify-center gap-2 text-lg"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="border-2 border-black rounded-md w-3/4 py-1 px-4"
          type="text"
          placeholder="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="bg-green-500 px-8 rounded-md py-1">
          Add
        </button>
      </form>
    </div>
  );
}
