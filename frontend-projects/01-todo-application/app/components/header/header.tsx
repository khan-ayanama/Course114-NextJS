"use client";

import { useTodo } from "@/app/provider/todo-provider";
import React, { useState } from "react";

export default function Header() {
  const [todo, setTodo] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // State to track active tab
  const { addTodo, handleRenderTodo } = useTodo();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  }

  return (
    <section className="w-1/2 mx-auto">
      <div>
        <ul className="flex justify-between text-lg text-gray-400 border-b-4 font-bold">
          <li
            onClick={() => {
              handleRenderTodo("all");
              setActiveTab("all");
            }}
            className={`cursor-pointer border-b-4 ${
              activeTab === "all" ? "border-green-500" : "border-transparent"
            }`}
          >
            All
          </li>
          <li
            onClick={() => {
              handleRenderTodo("active");
              setActiveTab("active");
            }}
            className={`cursor-pointer border-b-4 ${
              activeTab === "active" ? "border-green-500" : "border-transparent"
            }`}
          >
            Active
          </li>
          <li
            onClick={() => {
              handleRenderTodo("completed");
              setActiveTab("completed");
            }}
            className={`cursor-pointer border-b-4 ${
              activeTab === "completed"
                ? "border-green-500"
                : "border-transparent"
            }`}
          >
            Completed
          </li>
        </ul>
      </div>
      <div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex justify-between my-4"
        >
          <input
            type="text"
            className="border-2 outline-none border-gray-400 rounded-md w-3/4 py-2 px-4 font-semibold text-gray-600"
            placeholder="Write your todo!!"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <input
            type="submit"
            value="Add Todo"
            className="bg-green-400 hover:bg-green-500 font-bold text-white rounded-md px-4 py-2 cursor-pointer"
          />
        </form>
      </div>
    </section>
  );
}
