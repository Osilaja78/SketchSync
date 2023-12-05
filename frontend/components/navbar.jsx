"use client"
import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Logo from '../public/images/logo-only.png';
import { AuthContext } from './auth/AuthContext';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';


export default function Navbar() {

  const [ isMobileMenuOpen, setMobileMenuOpen ] = useState(false);
  const [ isClient, setIsClient ] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsClient(true);
  })

  // let btnComp;

  // if (isLoggedIn === false) {
  //   btnComp = 
  // } else if (isLoggedIn === true) {
  //   btnComp = 
  // }

  return (
    <nav className="flex items-center px-[50px] py-[10px] justify-between max-w-[1400px] mx-auto text-white">
      {/* <div> */}
      <Link href="/" className="flex gap-5 items-center cursor-pointer">
        <Image src={Logo} width={60} alt="logo" />
        <p className="text-[30px]">SketchSync</p>
      </Link>
      {/* </div> */}

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <button onClick={toggleMobileMenu} className="text-[30px]">
          ☰
        </button>
        {isMobileMenuOpen && (
          <ul className="absolute top-[80px] left-0 bg-white z-50 p-8 list-none flex flex-col gap-5 w-screen">
            <li>Home</li>
            <ScrollLink to="features" spy={true} smooth={true} duration={500}>
              <li>Features</li>
            </ScrollLink>
            <ScrollLink to="about" spy={true} smooth={true} duration={500}>
              <li className='cursor-pointer'>About</li>
            </ScrollLink>
            {isClient && (
              isLoggedIn == false ? <Link href="/auth/signup"><li className="bg-blue-700 text-white py-3 px-5 rounded-xl max-w-max">Sign Up</li></Link>
              :
              <li className="bg-blue-700 text-white py-3 px-5 rounded-xl max-w-max" onClick={() => logout()}>Sign Out</li>
            )}
          </ul>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-10 text-[20px]">
        <ul className="flex items-center gap-10 text-[20px]">
            <Link href="/">
              <li>Home</li>
            </Link>
            <ScrollLink to="features" spy={true} smooth={true} duration={500}>
              <li className='cursor-pointer'>Features</li>
            </ScrollLink>
            <ScrollLink to="about" spy={true} smooth={true} duration={500}>
              <li className='cursor-pointer'>About</li>
            </ScrollLink>
            {isClient && (
              isLoggedIn == false ? <Link href="/auth/signup"><li className="bg-blue-700 text-white py-3 px-5 rounded-xl">Sign Up</li></Link>
              :
              isLoggedIn == true && <li className="bg-blue-700 text-white py-3 px-5 rounded-xl cursor-pointer" onClick={() => logout()}>Sign Out</li>
            )}
        </ul>
      </div>
    </nav>
  );
}
