import SketchAnimation from "../public/animations/sketch-animation.json";
import Lottie from "lottie-react";
import Popup from 'reactjs-popup';
import CreateBoardPopup from "./popup";
import 'reactjs-popup/dist/index.css';


export default function HeroSection() {

    const createButton = <button className="bg-red-500 rounded-xl px-5 py-4 text-white mt-2">Start Whiteboarding</button>


    return (
        <div className="md:flex w-[80%] md:w-[100%] max-w-[1000px] mx-auto gap-10 mt-[40px] md:mt-[70px]">
            <div className="max-w-[650px]">
                <h1 className="text-[30px] md:text-[50px]">Unlock Seamless Collaboration with Our Real-Time Whiteboard</h1>
                <h2 className="text-[20px] mt-3">Transform Ideas into Reality — Together, Anytime, Anywhere</h2>
                <Popup 
                    trigger={createButton} 
                    modal
                    contentStyle={{
                        maxWidth: '400px',
                        borderRadius: '20px'
                    }}
                >
                    <CreateBoardPopup />
                </Popup>
            </div>
            <div>
                <Lottie animationData={SketchAnimation} className='max-w-[800px]'/>
            </div>
        </div>
    )
}