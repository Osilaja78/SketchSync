"use client"
// import "./globals.css";
import { React, useContext, useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/heroSection';
import DemoSection from '@/components/demoSection';
import FeaturesSection from '@/components/featuresSection';
import WhyChooseUsComponent from '@/components/whyChooseUs';
import TeamsComponent from "@/components/teams";
import Footer from "@/components/footer";
import { AuthContext } from '@/components/auth/AuthContext';


const HomePage = () => {

  const { isLoggedIn, logout } = useContext(AuthContext);
  const [ isClient, setIsClient ] = useState(false);

  useEffect(() => {
    setIsClient(true);
  })

  return (
    <>
      <section className="background">
        {/* <Image src={bg} className='absolute'/> */}
        <div className='hero bg-white h-screen w-screen relative bg-opacity-8'>
          <Navbar />
          <HeroSection />
        </div>
      </section>
      <section className=''>
        <DemoSection />
      </section>
      <section className='max-w-[1000px] mx-auto'>
        <FeaturesSection />
      </section>
      <section>
        <WhyChooseUsComponent />
      </section>
      <section className='choose'>
        <TeamsComponent />
      </section>
      <section className="max-w-[600px] mx-auto my-20">
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


// export default function Home() {
//   // const [boardId, setBoardId] = useState(null);
//   const router = useRouter();

//   const handleCreateBoard = async () => {
//     // Make a request to your backend to create a new board and get the board ID
//     const response = await fetch('http://localhost:8000/create_board', {
//       method: 'POST',
//     });
//     const data = await response.json();
//     console.log(data.board_id);

//     router.push(`/whiteboard/${data.board_id}?h=true`);
//   };

//   return (
//     <div className='max-w-max mx-auto bg-red-600 text-white text-center p-20 mt-20'>
//       <h1>Welcome to the Whiteboard App</h1>
//       <button className='rounded-md bg-green-700 p-5 mt-5' onClick={handleCreateBoard}>Create New Board</button>
//     </div>
//   );
// };
