'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import InteractiveForm from '@/components/InteractiveForm'

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Add event listener to detect when body overflow changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          const bodyStyle = document.body.style;
          setIsModalOpen(bodyStyle.overflow === 'hidden');
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className={`min-h-screen flex flex-col ${isModalOpen ? 'overflow-hidden h-screen' : ''}`}>
      <Header />
      <Hero />
      <InteractiveForm />
      {!isModalOpen && (
        <>
          <Footer />
        </>
      )}
    </main>
  );
}