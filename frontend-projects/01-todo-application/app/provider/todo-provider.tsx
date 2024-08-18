"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

type Todo = {
  id: string;
  task: string;
  status: "completed" | "pending";
  createdAt: Date;
};

interface TodoContext {
  todos: Todo[];
  renderTodo: Todo[];
  addTodo: (task: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  handleRenderTodo: (filter: string) => void;
  handleEditedTodos: ({ id, task }: { id: string; task: string }) => void;
}

export const todoContext = createContext<TodoContext | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [renderTodo, setRenderTodo] = useState<Todo[]>(todos);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todoItems: Todo[] = JSON.parse(storedTodos);
      setTodos(todoItems);
      setRenderTodo(todoItems);
    }
  }, []);

  const addTodo = (task: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      task: task,
      status: "pending",
      createdAt: new Date(),
    };
    setTodos((prevTodos) => {
      setRenderTodo([newTodo, ...prevTodos]);
      localStorage.setItem("todos", JSON.stringify([newTodo, ...prevTodos]));
      return [newTodo, ...prevTodos];
    });
  };

  const deleteTodo = (id: string) => {
    const remainedTodos = todos.filter((todo) => todo.id !== id);
    setRenderTodo(remainedTodos);
    setTodos(remainedTodos);
    localStorage.setItem("todos", JSON.stringify(remainedTodos));
  };

  const toggleTodo = (id: string) => {
    const editedTodos: Todo[] = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: todo.status === "completed" ? "pending" : "completed",
          }
        : todo
    );
    setRenderTodo(editedTodos);

    setTodos(editedTodos);
    localStorage.setItem("todos", JSON.stringify(editedTodos));
  };

  const handleEditedTodos = ({ id, task }: { id: string; task: string }) => {
    const edited: Todo[] = todos.map((todo) =>
      todo.id == id ? { ...todo, task } : todo
    );
    setRenderTodo(edited);
    setTodos(edited);
    localStorage.setItem("todos", JSON.stringify(edited));
  };

  const handleRenderTodo = (filter: string) => {
    switch (filter) {
      case "all":
        return setRenderTodo(todos);
      case "active":
        return setRenderTodo(
          todos.filter((todo) => todo.status !== "completed")
        );
      case "completed":
        return setRenderTodo(
          todos.filter((todo) => todo.status === "completed")
        );
      default:
        return setRenderTodo(todos);
    }
  };

  return (
    <todoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        handleRenderTodo,
        renderTodo,
        handleEditedTodos,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(todoContext);
  if (!context) {
    throw new Error("Context is outside of component");
  }
  return context;
};
