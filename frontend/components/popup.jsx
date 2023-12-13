// Popup notification for usrs when creating a new whiteboard.
import { React, useState } from "react";
import { useRouter } from "next/navigation";
import { warn, baseApiUrl } from "@/app/layout";
import { ToastContainer } from "react-toastify";


export default function CreateBoardPopup() {

    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    // Action taken when continue button is clicked.
    const handleCreateBoard = async () => {
        setIsLoading(true);
        // Make a request to the backend to create a new board and get the board ID
        try {
            const response = await fetch(`${baseApiUrl}/create_board`, {
            method: 'POST',
            });
            const data = await response.json();
    
            router.push(`/whiteboard/${data.board_id}?h=true`);
        } catch (err) { // handle API errors.
            warn(err);
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-white rounded-2xl p-10 max-w-[400px]">
            <h1 className="text-[30px] text-center pb-5">Continue without signing In?</h1>
            <div className="max-w-max mx-auto flex flex-row gap-5">
                <button className="bg-blue-700 text-white mx-auto py-3 px-5 rounded-xl">Sign In</button>
                <button className="bg-red-600 text-white mx-auto py-3 px-5 rounded-xl" onClick={handleCreateBoard}>{isLoading == false ? 'Create My Board' : 'Loading...'}</button>
            </div>
            <ToastContainer />
        </div>
    )
}