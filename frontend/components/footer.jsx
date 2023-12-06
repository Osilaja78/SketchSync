import Image from "next/image";
import Logo from "../public/images/logo-only.png";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";


export default function Footer() {
    return (
        <>
            <section className="max-w-[1000px] mx-auto">
                <div className="flex flex-col md:grid md:grid-cols-5 m-auto py-20">
                    <div className='flex flex-col gap-8 items-center col-span-2'>
                        <div className="flex items-center">
                            <Image src={Logo} width={70} alt="logo"/>
                            <h1 className='text-3xl pl-3'>SketchSync</h1>
                        </div>
                        <p className="pl-20">
                            Unlock Seamless Collaboration with Our Real-Time Whiteboard
                        </p>
                    </div>
                    <div className="col-span-3 flex flex-col md:flex-row mx-8 md:mx-0 justify-between text-gray-600 gap-5 md:gap-0 mt-5 md:mt-0 pl-0 md:pl-20">
                        <div>
                            <p className="text-[25px]">Useful Links</p>
                            <ul>
                                <Link href="/">
                                    <li>Home</li>
                                </Link>
                                <ScrollLink to="features" spy={true} smooth={true} duration={500}>
                                    <li>Features</li>
                                </ScrollLink>
                                <ScrollLink to="features" spy={true} smooth={true} duration={500}>
                                    <li>About</li>
                                </ScrollLink>
                            </ul>
                        </div>
                        <div>
                            <p className="text-[25px]">Support</p>
                            <ul>
                                <li>FAQs</li>
                                <li>Terms Of Use</li>
                                <li>Help</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-[25px]">Socials</p>
                            <ul>
                                <Link href="https://twitter.com/HameedOsilaja" target="blank">
                                    <li>Twitter</li>
                                </Link>
                                <Link href="https://github.com/Osilaja78" target="blank">
                                    <li>GitHub</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
