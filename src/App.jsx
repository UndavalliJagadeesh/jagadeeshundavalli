import './styles.css';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { useScrollReveal } from './hooks/useScrollReveal';
import { ThemeProvider } from './context/ThemeContext';

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
    <ThemeProvider>
      <AnimatedBackground />
      <Header onNavigate={handleNavigate} />

      <main>
        <Hero onNavigate={handleNavigate} />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
