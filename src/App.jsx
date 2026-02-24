import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import PaintingGame from './components/PaintingGame';
import Contact from './components/Contact';
import './App.css';

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <PaintingGame />
        <Contact />
      </main>
    </>
  );
}
