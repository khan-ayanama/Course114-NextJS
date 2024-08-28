import BlogList from "@/components/BlogList";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main>
      <ToastContainer theme="dark" />
      <Header />
      <BlogList />
    </main>
  );
}
