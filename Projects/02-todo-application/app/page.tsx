import AddTodo from "./components/add-todo";
import Header from "./components/Header";
import { TodoPage } from "./components/todo-page";

export default function Home() {
  return (
    <main className="w-2/5 border-4">
      <Header />
      <AddTodo />
      <TodoPage />
    </main>
  );
}
