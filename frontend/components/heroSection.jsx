import SketchAnimation from "../public/sketch-animation.json";
import Lottie from "lottie-react";


export default function HeroSection() {
    return (
        <div className="flex max-w-[1000px] mx-auto gap-10 mt-[70px]">
            <div className="max-w-[650px]">
                <h1 className="text-[50px]">Unlock Seamless Collaboration with Our Real-Time Whiteboard</h1>
                <h2 className="text-[20px] mt-3">Transform Ideas into Reality — Together, Anytime, Anywhere</h2>
                <button className="bg-red-500 rounded-xl px-5 py-4 text-white mt-2">Get started</button>
            </div>
            <div>
                <Lottie animationData={SketchAnimation} className='max-w-[800px]'/>
            </div>
        </div>
    )
}