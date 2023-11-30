// import Image from "next/image";
// import Logo from "../public/images/logo-only.png";


// export default function Navbar() {
//     return (
//         <nav className="flex items-center px-[50px] py-[20px] justify-between">
//             <div className="flex gap-5 items-center">
//                 <Image src={Logo} width={60} alt="logo" />
//                 <p className="text-[30px]">SketchSync</p>
//             </div>
//             <div>
//                 <ul className="flex items-center gap-10 text-[20px]">
//                     <li>Home</li>
//                     <li>How It Works</li>
//                     <li>Contact Us</li>
//                     <li className="bg-blue-700 text-white py-3 px-5 rounded-xl">Sign Up</li>
//                 </ul>
//             </div>
//         </nav>
//     )
// }
import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../public/images/logo-only.png';

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center px-[50px] py-[20px] justify-between">
      <div className="flex gap-5 items-center">
        <Image src={Logo} width={60} alt="logo" />
        <p className="text-[30px]">SketchSync</p>
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
            <li className="bg-blue-700 text-white py-3 px-5 rounded-xl max-w-max">Sign Up</li>
          </ul>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-10 text-[20px]">
        <ul className="flex items-center gap-10 text-[20px]">
            <li>Home</li>
            <li>How It Works</li>
            <li>Contact Us</li>
            <li className="bg-blue-700 text-white py-3 px-5 rounded-xl">Sign Up</li>
        </ul>
      </div>
    </nav>
  );
}
