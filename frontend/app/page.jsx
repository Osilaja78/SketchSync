"use client"
// Main homepage component.
import { React, useContext, useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/heroSection';
import FeaturesSection from '@/components/featuresSection';
import WhyChooseUsComponent from '@/components/whyChooseUs';
import TeamsComponent from "@/components/teams";
import Footer from "@/components/footer";
import { AuthContext } from '@/components/auth/AuthContext';


const HomePage = () => {

  const { isLoggedIn } = useContext(AuthContext);
  const [ isClient, setIsClient ] = useState(false);

  useEffect(() => {
    setIsClient(true);
  })

  return (
    <>
      <section className="background">
        <div className='hero bg-white min-h-min h-max w-screen relative bg-opacity-8'>
          <Navbar home={true} />
          <HeroSection />
        </div>
      </section>
      <section id='features' className='max-w-[1000px] mx-auto'>
        <FeaturesSection />
      </section>
      <section id='about'>
        <WhyChooseUsComponent />
      </section>
      <section className='choose'>
        <TeamsComponent />
      </section>
      <section className="max-w-[600px] mx-auto my-20 px-6 md:px-0 text-center md:text-left">
        <h1 className="text-[30px]">Ready to Transform Your Collaboration?</h1>
        <p className="text-center text-[20px] py-5">
          Sign up for SketchSync today and experience 
          the future of collaborative work. Elevate your 
          projects, foster teamwork, and make distance a 
          thing of the past.
        </p>
        <div className="max-w-max mx-auto flex flex-row gap-5">
          {isClient && isLoggedIn == false && <button className="bg-blue-700 text-white mx-auto py-3 px-5 rounded-xl">Sign Up</button>}
          <button className="bg-red-600 text-white mx-auto py-3 px-5 rounded-xl">Start Whiteboarding</button>
        </div>
      </section>
      <section className="bg-gray-100">
        <Footer />
      </section>
    </>
  );
};

export default HomePage;
