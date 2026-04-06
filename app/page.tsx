import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
