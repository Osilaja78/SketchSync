import SketchAnimation from "../public/animations/sketch-animation.json";
import Lottie from "lottie-react";
import Popup from 'reactjs-popup';
import CreateBoardPopup from "./popup";
import 'reactjs-popup/dist/index.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { baseApiUrl } from "@/app/layout";
import { Island_Moments } from "next/font/google";


export default function HeroSection() {

    const [ isClient, setIsClient ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
    const createButton = <button className="bg-red-500 rounded-xl px-5 py-4 text-white mt-2">Start Whiteboarding</button>

    useEffect(() => {
        setIsClient(true);
    })
    const router = useRouter();

    const handleCreateBoard = async () => {
        setIsLoading(true);
        // Make a request to the backend to create a new board and get the board ID
        const response = await fetch(`${baseApiUrl}/create_board`, {
        method: 'POST',
        });
        const data = await response.json();

        router.push(`/whiteboard/${data.board_id}?h=true`);
        setIsLoading(false);
    };

    return (
        <div className="md:flex items-center w-[80%] md:w-[100%] max-w-[1000px] mx-auto gap-10 mt-[40px] md:mt-[70px] pb-[135px] text-white">
            <div className="max-w-[650px] text-center md:text-left">
                <h1 className="text-[30px] md:text-[50px]">Unlock Seamless Collaboration with Our Real-Time Whiteboard</h1>
                <h2 className="text-[20px] mt-3">Transform Ideas into Reality — Together, Anytime, Anywhere</h2>
                {isClient && isLoggedIn == false ? <Popup 
                    trigger={createButton} 
                    modal
                    contentStyle={{
                        maxWidth: '400px',
                        borderRadius: '20px'
                    }}
                >
                    <CreateBoardPopup />
                </Popup>
                :
                <button className={`bg-red-500 rounded-xl px-5 py-4 text-white mt-2 ${isLoading ? 'disabled' : ''}`} onClick={handleCreateBoard}>{isLoading == false ? 'Start Whiteboarding' : 'Loading...'}</button>
                }
            </div>
            <div>
                <Lottie animationData={SketchAnimation} className='max-w-[800px]'/>
            </div>
        </div>
    )
}