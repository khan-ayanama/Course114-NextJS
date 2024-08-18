import Grid from "./components/Grid";
import Hero from "./components/Hero";
import { FloatingNavDemo } from "./components/Navbar";

export default function Home() {
  return (
    <main>
      <FloatingNavDemo />
      <Hero />
      <Grid />
    </main>
  );
}
