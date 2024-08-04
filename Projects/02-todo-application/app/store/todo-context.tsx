"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  useEffect,
} from "react";

// Define the Todo type
type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: string;
};

// Define the Todo context type
type TodoContextType = {
  todos: Todo[];
  completedTodo: Todo[];
  addTodo: (task: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

// Create the Todo context
const TodoContext = createContext<TodoContextType | null>(null);

// Define the context provider component
export const TodoContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodo, setCompleteTodo] = useState<Todo[]>([]);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos));
        }
      } catch (error) {
        console.error("Error loading todos from localStorage:", error);
      }
    }
  }, []);

  const addTodo = (task: string) => {
    setTodos((prevTodos) => {
      const newTodos: Todo[] = [
        {
          id: Date.now().toString(),
          task,
          completed: false,
          createdAt: new Date().toISOString(),
        },
        ...prevTodos,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) => {
      const newTodos: Todo[] = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => {
      const newTodos: Todo[] = prevTodos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        completedTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const todosContextValue = useContext(TodoContext);
  if (!todosContextValue) {
    throw new Error("useTodos is outside of provider");
  }
  return todosContextValue;
};
