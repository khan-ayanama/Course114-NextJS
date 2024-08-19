import Approach from "./components/Approach";
import Clients from "./components/Clients";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import Hero from "./components/Hero";
import { FloatingNavDemo } from "./components/Navbar";
import RecentProjects from "./components/RecentProject";

export default function Home() {
  return (
    <main>
      <FloatingNavDemo />
      <Hero />
      <Grid />
      <RecentProjects />
      <Clients />
      <Experience />
      <Approach />
      <Footer />
    </main>
  );
}
