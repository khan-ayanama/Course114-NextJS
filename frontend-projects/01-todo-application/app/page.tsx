import { PiNotepad } from "react-icons/pi";
import Header from "./components/header/header";
import TodoList from "./components/todo-list/todo-list";

export default function Home() {
  return (
    <main className="w-3/4 mx-auto">
      <section className="text-center text-4xl uppercase font-bold flex  justify-center gap-8 items-center my-8">
        <PiNotepad className="text-red-400" />
        <h2>Todo Next + Typescript</h2>
        <PiNotepad className="text-red-400" />
      </section>
      <Header />
      <TodoList />
    </main>
  );
}
