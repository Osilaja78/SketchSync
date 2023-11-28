"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "./globals.css";
import Image from 'next/image';
import bg from '../public/hero-bg.svg';


// HeroSection.js

import React from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/heroSection';

const HomePage = () => {
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
        new content here
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
