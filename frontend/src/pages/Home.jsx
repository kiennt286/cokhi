import React from 'react';
import Hero from '../components/Hero';
import BrandShowcase from '../components/BrandShowcase';
import AboutSection from '../components/AboutSection';
import SupplySection from '../components/SupplySection';
import QuickContactSection from '../components/QuickContactSection';
import KnowledgePreviewSection from '../components/KnowledgePreviewSection';
import Seo from '../components/Seo';

const Home = () => {
  return (
    <div>
      <Seo
        title="Trang chủ"
        description="CNC Bắc Ninh chuyên cung cấp dụng cụ CNC, dao cụ cơ khí và tư vấn kỹ thuật theo nhu cầu gia công."
        path="/"
      />
      <Hero />
    

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
        <AboutSection />
        <hr className='border-gray-300' />
        <SupplySection />
        <hr className='border-gray-300' />

        <KnowledgePreviewSection />

        <QuickContactSection />
      </div>
     
      
    </div>
  );
};

export default Home;
