import Image from "next/image";
import Logo from "../public/images/logo-only.png";


export default function Footer() {
    return (
        // <footer className="max-w-[1000px] mx-auto py-10">
        //     <div className="">
        //         <div className="flex gap-5 items-center">
        //             <Image src={Logo} width={60} alt="logo" />
        //             <p className="text-[30px]">SketchSync</p>
        //         </div>
        //         <p className="max-w-[350px] pt-5">
        //             Unlock Seamless Collaboration with Our Real-Time Whiteboard
        //         </p>
        //     </div>
        //     <div>
        //         <ul>
        //             <li></li>
        //         </ul>
        //     </div>
        // </footer>
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
                                <li>Home</li>
                                <li>How it works</li>
                                <li>Contact us</li>
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
                                <li>Twitter</li>
                                <li>GitHub</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
