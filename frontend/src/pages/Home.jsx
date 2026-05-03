import React from 'react';
import Hero from '../components/Hero';
import BrandShowcase from '../components/BrandShowcase';
import AboutSection from '../components/AboutSection';
import SupplySection from '../components/SupplySection';
import QuickContactSection from '../components/QuickContactSection';
import KnowledgePreviewSection from '../components/KnowledgePreviewSection';

const Home = () => {
  return (
    <div>
      <Hero />
    

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
        <AboutSection />
        <hr className='border-gray-300 my-4' />
        <SupplySection />
        <hr className='border-gray-300 my-4' />

        <KnowledgePreviewSection />

        <QuickContactSection />
      </div>
     
      
    </div>
  );
};

export default Home;
