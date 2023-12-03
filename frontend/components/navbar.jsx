"use client"
import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Logo from '../public/images/logo-only.png';
import { AuthContext } from './auth/AuthContext';
import Link from 'next/link';


export default function Navbar() {

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  let btnComp;
  useEffect(() => {
    if (isLoggedIn === false) {
      btnComp = <Link href="/auth/signup"><li className="bg-blue-700 text-white py-3 px-5 rounded-xl max-w-max">Sign Up</li></Link>
    } else if (isLoggedIn === true) {
      btnComp = <li className="bg-blue-700 text-white py-3 px-5 rounded-xl max-w-max" onClick={() => logout}>Sign Out</li>
    }
  })

  return (
    <nav className="flex items-center px-[50px] py-[20px] justify-between">
      <div className="flex gap-5 items-center cursor-pointer">
        <Link href="/">
          <Image src={Logo} width={60} alt="logo" />
          <p className="text-[30px]">SketchSync</p>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <button onClick={toggleMobileMenu} className="text-[30px]">
          ☰
        </button>
        {isMobileMenuOpen && (
          <ul className="absolute top-[80px] left-0 bg-white z-50 p-8 list-none flex flex-col gap-5 w-screen">
            <li>Home</li>
            <li>How It Works</li>
            <li>Contact Us</li>
            {btnComp}
          </ul>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-10 text-[20px]">
        <ul className="flex items-center gap-10 text-[20px]">
            <li>Home</li>
            <li>How It Works</li>
            <li>Contact Us</li>
            {isLoggedIn == false && <li className="bg-blue-700 text-white py-3 px-5 rounded-xl">Sign Up</li>}
            {isLoggedIn == true && <li className="bg-blue-700 text-white py-3 px-5 rounded-xl">Sign Out</li>}
        </ul>
      </div>
    </nav>
  );
}
