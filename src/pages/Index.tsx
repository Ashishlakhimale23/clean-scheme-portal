
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { SchemeCategories } from '../components/SchemeCategories';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll animation
    const smoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href');
        document.querySelector(id!)?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', smoothScroll);
    
    return () => document.removeEventListener('click', smoothScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <SchemeCategories />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
