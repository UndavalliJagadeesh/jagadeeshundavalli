import './styles.css';
import Starfield from './components/Starfield';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  // Initialize scroll reveal animations
  useScrollReveal();

  // Smooth scroll for anchor links
  const handleNavigate = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Starfield />
      <Header onNavigate={handleNavigate} />

      <main>
        <Hero onNavigate={handleNavigate} />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
